import { useEffect, useState } from 'react';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieDetailsPoster = ({ data }) => {
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const { currentUser } = useAuth();
	const [isWatchlisted, setIsWatchlisted] = useState(false);
	const [hoverOnButton, setHoverOnButton] = useState(false);

	const posterImg = data?.poster_path
		? `https://image.tmdb.org/t/p/w500${data.poster_path}`
		: posterPlaceholder;

	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === data.id);
		setIsWatchlisted(watchlistState);
	}, [moviesWatchlist, data]);

	return (
		<div className='relative w-full'>
			<img className='w-full h-auto' src={posterImg} alt='Movie Poster' />
			{isWatchlisted ? (
				<button
					className='absolute bottom-0 right-0 w-12 h-12 px-1.5 py-1.5 mx-2 my-2 border-2 rounded-full bg-white-custom border-white-custom focus:outline-none'
					onClick={() => removeMovie(`${data?.id}`)}>
					<img
						className='w-full h-auto'
						src='https://icongr.am/material/check.svg?size=64&color=000000'
						alt='Remove from Watchlist Icon'
					/>
				</button>
			) : (
				<>
					<button
						className='absolute bottom-0 right-0 w-12 h-12 mx-2 my-2 bg-black bg-opacity-75 border-2 rounded-full border-white-custom focus:outline-none hover:bg-opacity-100 hover:border-black hover:invert hover:filter'
						onClick={() => (currentUser ? addMovie(data?.id, data?.poster_path) : null)}
						onMouseEnter={() => setHoverOnButton(true)}
						onMouseLeave={() => setHoverOnButton(false)}>
						<img
							className='w-full h-auto'
							src='https://icongr.am/material/plus.svg?size=64&color=ffffff'
							alt='Add to Watchlist Icon'
						/>
					</button>
					{hoverOnButton && !currentUser && (
						<div className='absolute right-0 z-0 flex items-center justify-center w-48 h-16 mt-1.5 mr-2.5 text-sm border rounded border-white-custom bg-black-custom md:w-44 md:h-14 md:text-xs lg:text-sm lg:w-48 lg:h-16 2xl:text-lg 2xl:w-60 2xl:h-20'>
							<p className='px-4 text-center'>Sign in to add the movie to Watchlist</p>
							<span className='absolute right-0 w-3.5 h-3.5 mr-3.5 transform rotate-45 border-t border-l -top-1/8 -z-1 border-white-custom bg-black-custom'></span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MovieDetailsPoster;
