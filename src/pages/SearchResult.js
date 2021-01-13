import { useMovies } from '../contexts/MoviesContext';
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
	// Hooks
	const { searchResult, searchInputValue } = useMovies();

	return (
		<div className='pt-20 pb-4 sm:pt-24 sm:pb-16'>
			<h3 className='ml-5 text-xl font-bold sm:ml-11'>Search results: {searchInputValue}</h3>
			<div className='flex flex-wrap px-4 sm:px-10'>
				{searchResult.map((movie) => {
					return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
				})}
			</div>
		</div>
	);
};

export default SearchResult;
