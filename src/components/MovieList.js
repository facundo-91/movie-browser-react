import MovieCard from './MovieCard';

const MovieList = ({ title, movieList }) => {
	return (
		<div className='mb-2 mx-4'>
			<h3 className='ml-4 text-xl font-bold'>{title}</h3>
			<div className='flex items-center relative'>
				<button></button>
				<div className='w-full py-6 overflow-hidden'>
					<div className='flex flex-no-wrap bg-black-custom'>
						{movieList.map((movie) => {
							return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieList;
