import { useMovies } from '../contexts/MoviesContext';
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
	// Hooks
	const { searchResult, searchInputValue } = useMovies();

	return (
		<div className='pt-20 pb-4 mx-1/20 md:pt-24 md:pb-16'>
			<h3 className='ml-1 mb-1 text-lg font-bold md:text-1.5vw md:mb-2'>
				Search results: {searchInputValue}
			</h3>
			<div className='flex flex-wrap'>
				{searchResult.map((movie) => {
					return (
						<div
							key={movie.id}
							className='z-0 w-1/3 px-1 pb-2 transition duration-200 transform card-container min-w-1/3 md:w-1/6 md:min-w-1/6 xl:w-1/7 xl:min-w-1/7 2xl:w-1/8 2xl:min-w-1/8 hover:z-10 md:hover:scale-125 hover:delay-200'>
							<MovieCard id={movie.id} poster={movie.poster_path} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SearchResult;
