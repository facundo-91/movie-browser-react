import MovieCard from './MovieCard';

const MovieList = ({ title, movieList }) => {
	return (
		<div className='mb-2'>
			<h3 className='ml-10 -mb-6 text-xl font-bold'>{title}</h3>
			<div className='flex items-center relative'>
				<div>
					<button></button>
				</div>
				<div className='w-full py-8 overflow-hidden'>
					<div className='px-10 flex flex-no-wrap'>
						{movieList.map((movie) => {
							return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
						})}
					</div>
				</div>
				<div>
					<button></button>
				</div>
			</div>
		</div>
	);
};

export default MovieList;
