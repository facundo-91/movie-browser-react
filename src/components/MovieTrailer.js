const MovieTrailer = ({ movieInfo }) => {
	const trailerData =
		movieInfo?.videos.results.length > 0
			? movieInfo?.videos.results.find((video) => video.type === 'Trailer')
			: null;

	return (
		<section className='max-w-screen-lg px-3 py-6 mx-auto bg-gray-custom'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Trailer</h1>
			{trailerData ? (
				<div className='relative h-0 pb-9/16'>
					<iframe
						width='560'
						height='315'
						className='absolute inset-0 w-full h-full my-6'
						src={`https://www.youtube.com/embed/${trailerData?.key}`}
						frameBorder='0'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						title='Movie Trailer'></iframe>
				</div>
			) : (
				<p className='pt-2 pb-16 mx-1 text-lg'>Trailer Not Available</p>
			)}
			<hr className='w-full mt-24 border-t-2 border-gray-input-text' />
		</section>
	);
};

export default MovieTrailer;
