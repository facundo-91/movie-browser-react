import { useFirestore } from '../contexts/FirestoreContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
	// Hooks
	const { moviesWatchlist } = useFirestore();

	return (
		<div className='pt-20 pb-4 mx-1/20 md:pt-24 md:pb-16'>
			<h3 className='ml-1 mb-1 text-lg font-bold md:text-1.5vw md:mb-2'>Your Watchlist:</h3>
			<div className='flex flex-wrap'>
				{moviesWatchlist.map((movie) => {
					return (
						<div className='z-0 w-1/3 px-1 pb-2 transition duration-200 transform card-container min-w-1/3 md:w-1/8 md:min-w-1/8 hover:z-10 md:hover:scale-150 hover:delay-500'>
							<MovieCard key={movie.movie_id} id={movie.movie_id} poster={movie.poster_url} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Watchlist;
