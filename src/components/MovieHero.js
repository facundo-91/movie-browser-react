import { useEffect, useState } from 'react';

const MovieHero = ({ id }) => {
	// States
	const [movieInfo, setMovieInfo] = useState([]);
	const [runtime, setRuntime] = useState('');
	const [rating, setRating] = useState(null);

	// Effects
	// Fetch movie info
	useEffect(() => {
		const getMovieInfo = async () => {
			const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setMovieInfo(responseJson);
		};
		getMovieInfo();
	}, [id, setMovieInfo]);
	console.log(movieInfo);

	// Convert runtime in minutes to h and m
	useEffect(() => {
		const movieRuntime = (minutesToConvert) => {
			const min = minutesToConvert;
			const hours = min / 60;
			const roundedHours = Math.floor(hours);
			const minutes = (hours - roundedHours) * 60;
			const roundedMinutes = Math.round(minutes);
			setRuntime(roundedHours + 'h ' + roundedMinutes + 'min');
		};
		if (movieInfo) {
			movieRuntime(movieInfo.runtime);
		}
	}, [movieInfo]);

	// Save rating number
	useEffect(() => {
		if (movieInfo) {
			setRating(movieInfo.vote_average);
		}
	}, [movieInfo]);

	return (
		<header
			className='mb-4 min-h-screen-75 h-75 w-full bg-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`,
			}}>
			<div className='w-6/12 mx-24 h-full flex flex-col justify-center'>
				<h1 className='mb-2 text-5xl font-bold'>{movieInfo.title}</h1>
				<div className='mb-6 flex items-center'>
					<div className='flex items-center'>
						<svg
							className={
								'mx-1 w-4 h-4 fill-current ' +
								(rating > 0 && rating < 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mx-1 w-4 h-4 fill-current ' +
								(rating > 0 && rating < 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mx-1 w-4 h-4 fill-current ' +
								(rating > 0 && rating < 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mx-1 w-4 h-4 fill-current ' +
								(rating > 0 && rating < 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
						<svg
							className={
								'mx-1 w-4 h-4 fill-current ' +
								(rating > 0 && rating < 20 ? 'text-red-custom' : 'text-gray-400')
							}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
						</svg>
					</div>
					<p className='mx-4'>{movieInfo.release_date}</p>
					<p className='mx-4'>{runtime}</p>
				</div>
				<div className='w-120 mb-8'>
					<p className='text-base font-hairline text-white-custom'>{movieInfo.overview}</p>
				</div>
				<div>
					<button className='py-2 px-4 mr-6 w-32 font-bold border-2 border-red-custom bg-red-custom'>
						More Info
					</button>
					<button className='py-2 px-4 w-48 font-bold border-2 border-white-custom'>
						Add to Watchlist
					</button>
				</div>
			</div>
		</header>
	);
};

export default MovieHero;
