import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

const DashboardHero = ({ movieInfo }) => {
	const { currentUser } = useAuth();
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const [isWatchlisted, setIsWatchlisted] = useState(false);
	const [hoverOnButton, setHoverOnButton] = useState(false);

	const heroImage =
		movieInfo?.backdrop_path !== undefined
			? window.matchMedia('(max-width: 767px)').matches
				? `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0) 50%), url(https://image.tmdb.org/t/p/original${movieInfo?.backdrop_path})`
				: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movieInfo?.backdrop_path})`
			: 'none';

	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === movieInfo.id);

		setIsWatchlisted(watchlistState);
	}, [moviesWatchlist, movieInfo]);

	return (
		<header
			className='relative flex items-end w-full bg-top bg-no-repeat bg-cover md:items-center h-screen-vw-120 md:h-screen-vw md:flex'
			style={{ backgroundImage: heroImage }}>
			<div className='flex flex-col w-full md:w-1/2 mx-1/20 mb-1/6 md:mb-1/8'>
				<h1 className='text-4xl font-bold leading-none text-center mb-2/20 md:mb-1/20 md:text-left md:text-xl lg:text-3.5vw lg:leading-tight'>
					{movieInfo?.title}
				</h1>
				<div className='hidden md:block mb-1/20'>
					<p
						style={{ textShadow: '2px 2px 4px rgb(0 0 0 / 45%)' }}
						className='text-1.3vw text-white-custom'>
						{movieInfo?.overview}
					</p>
				</div>
				<div className='flex md:justify-start'>
					<button className='flex items-center justify-center flex-1 py-2 pr-2 mr-2 font-bold text-black align-middle rounded md:flex-initial md:py-1.5 md:pl-3 md:pr-5 md:mr-3 lg:py-2 lg:pl-5 lg:pr-7 2xl:pl-7 2xl:pr-10 2xl:py-3 bg-primary-button focus:outline-none hover:bg-opacity-75'>
						<img
							className='w-6 h-6 mx-1 md:w-4 md:h-4 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
							src='https://icongr.am/material/information-outline.svg?size=32&color=000000'
							alt='Show info icon'
						/>
						<Link
							to={`/movie/${movieInfo?.id}`}
							className='text-lg md:text-sm lg:text-lg 2xl:text-2xl'>
							More Info
						</Link>
					</button>
					{isWatchlisted ? (
						<button
							className='flex items-center justify-center flex-1 py-2 pr-3 text-lg font-bold text-white align-middle bg-opacity-75 rounded md:flex-initial md:text-sm md:py-1.5 md:pl-4 md:pr-6 lg:py-2 lg:pl-7 lg:pr-10 lg:text-lg 2xl:py-3 2xl:pl-10 2xl:pr-14 2xl:text-2xl bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => removeMovie(`${movieInfo?.id}`)}>
							<img
								className='w-6 h-6 mx-1 md:w-4 md:h-4 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
								src='https://icongr.am/material/check.svg?size=32&color=ffffff'
								alt='Remove from list icon'
							/>
							My List
						</button>
					) : (
						<button
							className='relative flex flex-1 items-center justify-center py-2 pr-3 text-lg font-bold text-white align-middle bg-opacity-75 rounded md:flex-initial md:text-sm md:py-1.5 md:pl-4 md:pr-6 lg:py-2 lg:pl-7 lg:pr-10 lg:text-lg 2xl:py-3 2xl:pl-10 2xl:pr-14 2xl:text-2xl bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => (currentUser ? addMovie(movieInfo?.id, movieInfo?.poster_path) : null)}
							onMouseEnter={() => setHoverOnButton(true)}
							onMouseLeave={() => setHoverOnButton(false)}>
							<img
								className='w-6 h-6 mx-1 md:w-4 md:h-4 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
								src='https://icongr.am/material/plus.svg?size=32&color=ffffff'
								alt='Add to my list icon'
							/>
							{hoverOnButton && !currentUser && (
								<div className='absolute z-10 flex items-center justify-center w-48 h-16 text-sm border rounded -left-1 mt-1/25 top-100 border-white-custom bg-black-custom md:w-44 md:h-14 md:text-xs md:-left-8 lg:-left-6 lg:text-sm lg:w-52 lg:h-16 2xl:-left-5 2xl:text-lg 2xl:w-64 2xl:h-20'>
									<p className='px-4'>Sign in to add the movie to Watchlist</p>
									<span className='absolute top-0 left-0 w-4 h-4 -mt-2 transform rotate-45 border-t border-l ml-1/22 -z-1 border-white-custom bg-black-custom'></span>
								</div>
							)}
							My List
						</button>
					)}
				</div>
			</div>
			<div
				style={{
					backgroundImage:
						'linear-gradient(to bottom, rgba(20,20,20,0) 0, rgba(20,20,20,.15) 15%, rgba(20,20,20,.35) 29%, rgba(20,20,20,.58) 44%, #141414 68%, #141414 100%)',
					height: '14.7vw',
				}}
				className='absolute left-0 right-0 top-auto w-full bg-transparent -bottom-px'></div>
		</header>
	);
};

export default DashboardHero;
