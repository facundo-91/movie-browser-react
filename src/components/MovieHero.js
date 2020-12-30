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
			className='h-screen w-full bg-top bg-cover bg-no-repeat'
			style={{
				backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`,
			}}>
			<div className='w-6/12 mx-10 h-screen-80 flex flex-col justify-center'>
				<h1 className='mb-6 text-5xl font-bold'>{movieInfo.title}</h1>
				<div className='w-120 mb-4'>
					<p className='text-lg text-white-custom'>{movieInfo.overview}</p>
				</div>
				<div>
					<button className='py-2 px-6 mr-6 font-bold uppercase bg-red-custom rounded-sm border border-red-custom'>
						<Link to={`/movie/${id}`}>More Info</Link>
					</button>
					{watchlisted ? (
						<button
							className='py-2 px-6 font-bold uppercase bg-black bg-opacity-75 rounded-sm border border-white-custom border-opacity-75'
							onClick={() => removeMovie(`${movieInfo.id}`)}>
							Remove from My list
						</button>
					) : (
						<button
							className='py-2 px-6 font-bold uppercase bg-black bg-opacity-75 rounded-sm border border-white-custom border-opacity-75'
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
