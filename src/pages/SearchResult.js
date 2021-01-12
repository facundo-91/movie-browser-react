import { useMovies } from '../contexts/MoviesContext';
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
	// Hooks
	const { searchResult, searchInputValue } = useMovies();

	return (
		<div className='pt-24 pb-16'>
			<h3 className='ml-8 mb-2 text-xl font-bold'>Search results: {searchInputValue}</h3>
			<div className='px-8 flex flex-wrap'>
				{searchResult.map((movie) => {
					return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
				})}
			</div>
		</div>
	);
};

export default SearchResult;
