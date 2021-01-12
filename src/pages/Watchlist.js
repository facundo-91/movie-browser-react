import { useFirestore } from '../contexts/FirestoreContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
	// Hooks
	const { moviesWatchlist } = useFirestore();

	return (
		<div className='pt-24 pb-16 px-4'>
			<h3 className='ml-8 mb-2 text-xl font-bold'>Your Watchlist:</h3>
			<div className='px-8 flex flex-wrap'>
				{moviesWatchlist.map((movie) => {
					return <MovieCard key={movie.movie_id} id={movie.movie_id} poster={movie.poster_url} />;
				})}
			</div>
		</div>
	);
};

export default Watchlist;
