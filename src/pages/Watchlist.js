import { useFirestore } from '../contexts/FirestoreContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
	const { moviesWatchlist } = useFirestore();
	console.log(moviesWatchlist);

	return (
		<div className='pt-4 pb-4 px-4 bg-black-custom text-white-custom'>
			<h3 className='ml-4 text-xl font-bold'>Your Watchlist:</h3>
			<div className='flex flex-wrap w-full'>
				{moviesWatchlist.map((movie) => {
					return <MovieCard key={movie.movie_id} id={movie.movie_id} poster={movie.poster_url} />;
				})}
			</div>
		</div>
	);
};

export default Watchlist;
