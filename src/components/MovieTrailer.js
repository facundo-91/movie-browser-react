import { useState, useEffect } from 'react';

const MovieTrailer = ({ movieData }) => {
	// States
	const [trailerData, setTrailerData] = useState([]);

	// Effects
	// Save trailer URL
	useEffect(() => {
		if (movieData.videos.results.length !== 0) {
			const trailer = movieData.videos.results.filter((element) => element.type === 'Trailer');
			setTrailerData(trailer);
		}
	}, [movieData]);

	return movieData.videos.results.length !== 0 && trailerData[0] ? (
		<div className='max-w-screen-lg px-3 py-6 mx-auto bg-gray-custom'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Trailer</h1>
			<div className='relative h-0 pb-9/16'>
				<iframe
					width='560'
					height='315'
					className='absolute inset-0 w-full h-full my-6'
					src={`https://www.youtube-nocookie.com/embed/${trailerData[0].key}`}
					frameBorder='0'
					allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					title='Movie Trailer'></iframe>
			</div>
			<hr className='w-full h-24 border-b-2 border-gray-input-text'></hr>
		</div>
	) : null;
};

export default MovieTrailer;
