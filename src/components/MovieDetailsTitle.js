const MovieDetailsTitle = ({ data }) => {
	return (
		<>
			<p className='text-2xl font-bold tracking-tight lg:text-3xl'>
				{data?.title}
				<span className='font-normal'> ({data?.release_date?.slice(0, 4)})</span>
			</p>
			<div className='my-2 text-lg italic lg:text-xl'>
				<p>{data?.tagline}</p>
			</div>
		</>
	);
};

export default MovieDetailsTitle;
