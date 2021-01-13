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
				<div>
					<button className='px-6 py-2 mr-6 font-bold uppercase border rounded-sm bg-red-custom border-red-custom'>
						<Link to={`/movie/${id}`}>More Info</Link>
					</button>
					{watchlisted ? (
						<button
							className='px-6 py-2 font-bold uppercase bg-black bg-opacity-75 border border-opacity-75 rounded-sm border-white-custom'
							onClick={() => removeMovie(`${movieInfo.id}`)}>
							Remove from My list
						</button>
					) : (
						<button
							className='px-6 py-2 font-bold uppercase bg-black bg-opacity-75 border border-opacity-75 rounded-sm border-white-custom'
							onClick={() => addMovie(movieInfo.id, movieInfo.poster_path)}>
							+ My list
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default MovieHero;
