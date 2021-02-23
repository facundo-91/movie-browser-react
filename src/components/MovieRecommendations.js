import MovieCard from './MovieCard';

const MovieRecommendations = ({ movieData }) => {
	return (
		<div className='px-3 py-6 mx-4 bg-gray-custom xl:mx-0'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Recommendations</h1>
			<div className='flex flex-wrap mt-4'>
				{movieData.recommendations.results.map((movie) => {
					return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
				})}
			</div>
		</div>
	);
};

export default MovieRecommendations;
