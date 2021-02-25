import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../contexts/FirestoreContext';

const MovieHero = ({ id }) => {
	// Hooks
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const [movieInfo, setMovieInfo] = useState([]);
	const [watchlisted, setWatchlisted] = useState(false);

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
	}, [id]);

	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === id);
		setWatchlisted(watchlistState);
	}, [moviesWatchlist, id]);

	return (
		<header
			className='hidden w-full h-screen bg-top bg-no-repeat bg-cover sm:block'
			style={{
				backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`,
			}}>
			<div className='flex flex-col justify-center w-6/12 mx-10 h-screen-80'>
				<h1 className='mb-6 text-5xl font-bold'>{movieInfo.title}</h1>
				<div className='mb-4 w-120'>
					<p className='text-lg text-white-custom'>{movieInfo.overview}</p>
				</div>
				<div className='flex'>
					<button className='flex items-center justify-center py-2 pl-4 pr-8 mr-3 font-bold text-black align-middle rounded bg-primary-button focus:outline-none hover:bg-opacity-75'>
						<img
							className='w-6 h-6 mx-2'
							src='https://icongr.am/material/information-outline.svg?size=32&color=000000'
							alt='Show info icon'></img>
						<Link to={`/movie/${id}`}>More Info</Link>
					</button>
					{watchlisted ? (
						<button
							className='flex items-center justify-center py-2 pl-4 pr-8 font-bold text-white align-middle bg-opacity-75 rounded bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => removeMovie(`${movieInfo.id}`)}>
							<img
								className='w-6 h-6 mx-2'
								src='https://icongr.am/material/check.svg?size=32&color=ffffff'
								alt='Remove from list icon'></img>
							Remove from My list
						</button>
					) : (
						<button
							className='flex items-center justify-center py-2 pl-4 pr-8 font-bold text-white align-middle bg-opacity-75 rounded bg-secundary-button focus:outline-none hover:bg-opacity-50'
							onClick={() => addMovie(movieInfo.id, movieInfo.poster_path)}>
							<img
								className='w-6 h-6 mx-2'
								src='https://icongr.am/material/plus.svg?size=32&color=ffffff'
								alt='Add to my list icon'></img>
							My list
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default MovieHero;
