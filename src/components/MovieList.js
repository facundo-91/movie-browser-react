import MovieCard from './MovieCard';

const MovieList = ({ searchResult, trendingList, nowPlaying, upcoming, topRated }) => {
	if (searchResult.length === 0) {
		return (
			<>
				<div className='mb-2 mx-4'>
					<h3>Trending Today</h3>
					<div className='flex items-center relative'>
						<button></button>
						<div className='w-full py-6 overflow-hidden'>
							<div className='flex flex-no-wrap bg-black-custom'>
								{trendingList.map((movie) => {
									return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
								})}
							</div>
						</div>
					</div>
				</div>
				<div className='mb-2 mx-4'>
					<h3>Now Playing</h3>
					<div className='flex items-center relative'>
						<button></button>
						<div className='w-full py-6 overflow-hidden'>
							<div className='flex flex-no-wrap bg-black-custom'>
								{nowPlaying.map((movie) => {
									return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
								})}
							</div>
						</div>
					</div>
				</div>
				<div className='mb-2 mx-4'>
					<h3>Upcoming Movies</h3>
					<div className='flex items-center relative'>
						<button></button>
						<div className='w-full py-6 overflow-hidden'>
							<div className='flex flex-no-wrap bg-black-custom'>
								{upcoming.map((movie) => {
									return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
								})}
							</div>
						</div>
					</div>
				</div>
				<div className='mb-2 mx-4'>
					<h3>Top Rated</h3>
					<div className='flex items-center relative'>
						<button></button>
						<div className='w-full py-6 overflow-hidden'>
							<div className='flex flex-no-wrap bg-black-custom'>
								{topRated.map((movie) => {
									return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
								})}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className='mb-2 mx-4'>
				<h3>Search:</h3>
				<div className='flex items-center relative'>
					<button></button>
					<div className='w-full py-6 overflow-hidden'>
						<div className='flex flex-no-wrap bg-black-custom'>
							{searchResult.map((movie) => {
								return (
									<MovieCard
										key={movie.id.toString()}
										poster={movie.poster_path}
										title={movie.title}
										date={movie.release_date}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default MovieList;
