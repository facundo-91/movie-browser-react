import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

const MovieHero = ({ id }) => {
	// Hooks
	const { currentUser } = useAuth();
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const [movieInfo, setMovieInfo] = useState([]);
	const [watchlisted, setWatchlisted] = useState(false);
	const [hoverOnButton, setHoverOnButton] = useState(false);

	// Effects
	// Fetch movie info
	useEffect(() => {
		const getMovieInfo = async () => {
			if (id != null) {
				const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;
				const response = await fetch(url);
				const responseJson = await response.json();
				setMovieInfo(responseJson);
			}
		};
		getMovieInfo();
	}, [id]);

	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === id);
		setWatchlisted(watchlistState);
	}, [moviesWatchlist, id]);

	return movieInfo.backdrop_path !== undefined ? (
		<header
			className='relative hidden w-full bg-top bg-no-repeat bg-cover h-screen-vw md:block'
			style={{
				backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`,
			}}>
			<div className='absolute top-0 flex flex-col justify-end w-1/2 mx-1/20 bottom-40'>
				<h1 className='mb-1/20 text-3.5vw font-bold'>{movieInfo.title}</h1>
				<div className='mb-1/20'>
					<p
						style={{ textShadow: '2px 2px 4px rgb(0 0 0 / 45%)' }}
						className='text-1.5vw text-white-custom'>
						{movieInfo.overview}
					</p>
				</div>
				<div className='flex'>
					<button className='flex items-center justify-center py-2 pl-1 pr-4 mr-3 font-bold text-black align-middle rounded lg:pl-4 lg:pr-8 2xl:py-3 bg-primary-button focus:outline-none hover:bg-opacity-75'>
						<img
							className='w-4 h-4 mx-2 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
							src='https://icongr.am/material/information-outline.svg?size=32&color=000000'
							alt='Show info icon'></img>
						<Link to={`/movie/${id}`} className='text-xs lg:text-base 2xl:text-2xl'>
							More Info
						</Link>
					</button>
					{watchlisted ? (
						<button
							className='flex items-center justify-center py-2 pl-1 pr-4 text-xs font-bold text-white align-middle bg-opacity-75 rounded lg:pl-4 lg:pr-8 lg:text-base 2xl:text-2xl 2xl:py-3 bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => removeMovie(`${movieInfo.id}`)}>
							<img
								className='w-4 h-4 mx-2 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
								src='https://icongr.am/material/check.svg?size=32&color=ffffff'
								alt='Remove from list icon'></img>
							Remove from My list
						</button>
					) : (
						<button
							className='relative flex items-center justify-center py-2 pl-1 pr-4 text-xs font-bold text-white align-middle bg-opacity-75 rounded lg:pl-4 lg:pr-8 lg:text-base 2xl:text-2xl 2xl:py-3 bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => (currentUser ? addMovie(movieInfo.id, movieInfo.poster_path) : null)}
							onMouseEnter={() => setHoverOnButton(true)}
							onMouseLeave={() => setHoverOnButton(false)}>
							<img
								className='w-4 h-4 mx-2 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8'
								src='https://icongr.am/material/plus.svg?size=32&color=ffffff'
								alt='Add to my list icon'></img>
							{hoverOnButton && !currentUser && (
								<div className='absolute left-0 z-0 flex items-center justify-center w-48 h-12 text-sm border rounded mt-1/25 top-100 border-white-custom bg-black-custom'>
									<p>Sign in to add the movie to Watchlist</p>
									<span className='absolute top-0 left-0 w-4 h-4 ml-4 -mt-2 transform rotate-45 border-t border-l -z-1 border-white-custom bg-black-custom'></span>
								</div>
							)}
							My list
						</button>
					)}
				</div>
			</div>
			<div
				style={{
					backgroundImage:
						'linear-gradient(to bottom, rgba(20,20,20,0) 0, rgba(20,20,20,.15) 15%, rgba(20,20,20,.35) 29%, rgba(20,20,20,.58) 44%, #141414 68%, #141414 100%)',
					bottom: '-1px',
					height: '14.7vw',
				}}
				className='absolute left-0 right-0 top-auto w-full bg-transparent'></div>
		</header>
	) : null;
};

export default MovieHero;
