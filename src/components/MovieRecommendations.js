import MovieCard from './MovieCard';

const MovieRecommendations = ({ movieData }) => {
	return (
		<div className='px-3 py-6 mx-4 bg-gray-custom xl:mx-0'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Recommendations</h1>
			{movieData.recommendations.results.length !== 0 ? (
				<div className='flex flex-wrap my-4'>
					{movieData.recommendations.results.map((movie) => {
						return (
							<div className='z-0 w-1/3 px-1 pb-2 transition duration-200 transform card-container-small min-w-1/3 md:w-1/6 md:min-w-1/6 hover:z-10 md:hover:scale-125 hover:delay-200'>
								<MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />
							</div>
						);
					})}
				</div>
			) : (
				<p className='pt-2 pb-16 mx-1 text-lg'>
					We don't have enough data to suggest any movies based on {movieData.title}.
				</p>
			)}
		</div>
	);
};

export default MovieRecommendations;