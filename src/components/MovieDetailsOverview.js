const MovieDetailsOverview = ({ data }) => {
	return (
		<div className='mt-4 text-base md:text-sm lg:mt-6 lg:text-lg xl:text-lg'>
			<p>{data?.overview}</p>
		</div>
	);
};

export default MovieDetailsOverview;
