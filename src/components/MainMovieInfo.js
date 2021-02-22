import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

const MainMovieInfo = ({ movieData }) => {
	const { currentUser } = useAuth();
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const [watchlisted, setWatchlisted] = useState(false);
	const [runtime, setRuntime] = useState('');
	const [rating, setRating] = useState(null);
	const [certification, setCertification] = useState('');
	const [hoverOnButton, setHoverOnButton] = useState(false);

	// Effects
	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === movieData.id);
		setWatchlisted(watchlistState);
	}, [moviesWatchlist, movieData.id]);

	// Convert runtime in minutes to hr and min
	useEffect(() => {
		const movieRuntime = (minutesToConvert) => {
			const min = minutesToConvert;
			const hours = min / 60;
			const roundedHours = Math.floor(hours);
			const minutes = (hours - roundedHours) * 60;
			const roundedMinutes = Math.round(minutes);
			setRuntime(roundedHours + ' h ' + roundedMinutes + ' min');
		};
		if (Object.entries(movieData) !== 0) {
			movieRuntime(movieData.runtime);
		}
	}, [movieData]);

	// Save rating number
	useEffect(() => {
		if (Object.entries(movieData) !== 0) {
			setRating(movieData.vote_average * 10);
		}
	}, [movieData]);

	// Save certification
	useEffect(() => {
		if (movieData.hasOwnProperty('release_dates')) {
			const usaRelease = movieData.release_dates.results.find((x) => x.iso_3166_1 === 'US');
			const cert = usaRelease ? usaRelease.release_dates[0].certification : null;
			setCertification(cert);
		}
	}, [movieData]);

	return (
		<div className='flex flex-col mx-4 bg-opacity-50 bg-black-custom md:flex-row xl:mx-0'>
			<div className='relative w-full max-w-lg md:max-w-xs lg:max-w-sm'>
				<img
					className='w-full h-auto'
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt='Movie Poster'></img>
				{watchlisted ? (
					<button
						className='absolute bottom-0 right-0 w-12 px-2 py-2 mx-2 my-2 bg-black bg-opacity-75 border border-opacity-75 rounded-full border-white-custom focus:outline-none'
						onClick={() => removeMovie(`${movieData.id}`)}>
						<img
							className='w-full h-auto'
							src='https://icongr.am/fontawesome/bookmark.svg?size=64&color=ffffff'
							alt='Remove from Watchlist Icon'></img>
					</button>
				) : (
					<button
						className='absolute bottom-0 right-0 w-12 px-2 py-2 mx-2 my-2 bg-black bg-opacity-75 border border-opacity-75 rounded-full border-white-custom focus:outline-none'
						onClick={() => (currentUser ? addMovie(movieData.id, movieData.poster_path) : null)}
						onMouseEnter={() => setHoverOnButton(true)}
						onMouseLeave={() => setHoverOnButton(false)}>
						<img
							className='w-full h-auto'
							src='https://icongr.am/fontawesome/bookmark-o.svg?size=64&color=ffffff'
							alt='Add to Watchlist Icon'></img>
						{hoverOnButton && !currentUser && (
							<div className='absolute right-0 flex items-center justify-center w-48 h-12 mt-5 text-sm border rounded border-white-custom bg-black-custom'>
								<p>Sign in to add the movie to Watchlist</p>
								<span className='absolute top-0 right-0 w-4 h-4 mr-4 -mt-2 transform rotate-45 border-t border-l border-white-custom bg-black-custom'></span>
							</div>
						)}
					</button>
				)}
			</div>
			<div className='w-full px-4 py-4 lg:px-8 lg:py-8'>
				<p className='text-2xl font-bold tracking-tight lg:text-4xl'>
					{movieData.title}
					<span className='font-normal'> ({movieData.release_date.slice(0, 4)})</span>
				</p>
				<div className='my-2 text-lg italic lg:text-xl'>
					<p>{movieData.tagline}</p>
				</div>
				<div className='flex my-2 lg:my-4'>
					<div className='flex items-center'>
						<svg
							className={
								'mr-1 w-4 h-4 fill-current lg:w-6 lg:h-6 ' +
								(rating >= 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mr-1 w-4 h-4 fill-current lg:w-6 lg:h-6 ' +
								(rating >= 40 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mr-1 w-4 h-4 fill-current lg:w-6 lg:h-6 ' +
								(rating >= 60 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mr-1 w-4 h-4 fill-current lg:w-6 lg:h-6 ' +
								(rating >= 80 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mr-1 w-4 h-4 fill-current lg:w-6 lg:h-6 ' +
								(rating >= 100 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
					</div>
					<div className='flex items-center ml-1 lg:ml-4'>
						<p className='font-bold lg:text-2xl lg:mr-2'>{movieData.vote_average}</p>
					</div>
				</div>
				<div className='flex justify-between max-w-xs my-2 align-middle lg:my-4 lg:max-w-sm'>
					<div className='flex align-middle'>
						<img
							className='w-4 mr-1 lg:w-6 lg:mr-2'
							src='https://icongr.am/fontawesome/clock-o.svg?size=32&color=ffffff'
							alt='Clock Icon'></img>
						<p className='text-sm md:text-lg md:leading-8 md:tracking-tighter'>{runtime}</p>
					</div>
					<div className='flex align-middle '>
						<img
							className='w-4 mr-1 lg:w-6 lg:mr-2'
							src='https://icongr.am/fontawesome/calendar.svg?size=32&color=ffffff'
							alt='Calendar Icon'></img>
						<p className='text-sm md:text-lg md:leading-8 md:tracking-tighter'>
							{movieData.release_date.split('-').reverse().join('-')}
						</p>
					</div>
					<div className='px-2 my-auto border rounded border-white-custom'>
						<p className='text-sm lg:text-lg'>{certification}</p>
					</div>
				</div>
				<div className='flex flex-wrap my-4 gap-x-2 gap-y-2 lg:my-8'>
					{movieData.genres.map((x) => (
						<span
							key={x.id}
							className='px-2 text-sm font-bold border rounded border-white-custom lg:text-lg'>
							{x.name}
						</span>
					))}
				</div>
				<div className='mt-4 text-base lg:mt-8 lg:text-lg'>
					<p>{movieData.overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MainMovieInfo;
