import { useFirestore } from '../contexts/FirestoreContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
	// Hooks
	const { moviesWatchlist } = useFirestore();

	return (
		<div className='pt-20 pb-4 sm:pt-24 sm:pb-16'>
			<h3 className='ml-5 text-xl font-bold sm:ml-11'>Your Watchlist:</h3>
			<div className='flex flex-wrap px-4 sm:px-10'>
				{moviesWatchlist.map((movie) => {
					return <MovieCard key={movie.movie_id} id={movie.movie_id} poster={movie.poster_url} />;
				})}
			</div>
		</div>
	);
};

export default Watchlist;
