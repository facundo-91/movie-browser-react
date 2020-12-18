import { useMovies } from '../contexts/MoviesContext';
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
	// States
	const { searchResult, searchInputValue } = useMovies();

	return (
		<div className='pt-4 pb-4 px-4 bg-black-custom text-white-custom'>
			<h3>Search results: {searchInputValue}</h3>
			<div className='flex flex-wrap w-full'>
				{searchResult.map((movie) => {
					return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
				})}
			</div>
		</div>
	);
};

export default SearchResult;
