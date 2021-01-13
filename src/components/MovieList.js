import { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movieList }) => {
	const movieListContainer = useRef();
	const [scrolledFromLeftValue, setScrolledFromLeftValue] = useState(0);
	const [containerWidthValue, setContainerWidthValue] = useState(0);
	const [viewportWidthValue, setViewportWidthValue] = useState(0);
	const [hoverOnContainer, setHoverOnContainer] = useState(false);
	const showLeftButton = scrolledFromLeftValue > 0;
	const showRightButton = scrolledFromLeftValue + viewportWidthValue <= containerWidthValue;

	const scrollToLeft = () => {
		movieListContainer.current.scrollLeft =
			movieListContainer.current.scrollLeft - (movieListContainer.current.clientWidth - 120);
		setScrolledFromLeftValue(
			movieListContainer.current.scrollLeft - (movieListContainer.current.clientWidth - 120)
		);
	};
	const scrollToRight = () => {
		movieListContainer.current.scrollLeft =
			movieListContainer.current.scrollLeft + (movieListContainer.current.clientWidth - 80);
		setScrolledFromLeftValue(
			movieListContainer.current.scrollLeft + (movieListContainer.current.clientWidth - 80)
		);
	};

	useEffect(() => {
		setTimeout(() => {
			const containerWidth = movieListContainer.current.scrollWidth;
			const viewportWidth = movieListContainer.current.clientWidth;
			setContainerWidthValue(containerWidth);
			setViewportWidthValue(viewportWidth);
		}, 500);
	}, []);

	return (
		<div className='mb-6 sm:mb-2'>
			<h3 className='ml-5 text-xl font-bold sm:ml-10 sm:-mb-10'>{title}</h3>
			<div
				className='relative flex items-center'
				onMouseEnter={() => setHoverOnContainer(true)}
				onMouseLeave={() => setHoverOnContainer(false)}>
				{showLeftButton && (
					<button
						className={
							(hoverOnContainer ? 'opacity-100 ' : 'opacity-0 ') +
							'w-16 h-3/4 top-auto left-0 z-20 absolute bg-gradient-to-r from-black to-transparent transition-all duration-200 ease-in-out focus:outline-none'
						}
						onClick={() => scrollToLeft()}>
						<svg
							viewBox='0 0 284.935 284.936'
							style={{ enableBackground: 'new 0 0 284.935 284.936' }}
							className='w-8 mx-auto fill-current'>
							<path
								d='M110.488,142.468L222.694,30.264c1.902-1.903,2.854-4.093,2.854-6.567c0-2.474-0.951-4.664-2.854-6.563L208.417,2.857
								C206.513,0.955,204.324,0,201.856,0c-2.475,0-4.664,0.955-6.567,2.857L62.24,135.9c-1.903,1.903-2.852,4.093-2.852,6.567
								c0,2.475,0.949,4.664,2.852,6.567l133.042,133.043c1.906,1.906,4.097,2.857,6.571,2.857c2.471,0,4.66-0.951,6.563-2.857
								l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L110.488,142.468z'
							/>
						</svg>
					</button>
				)}
				<div
					className='w-full overflow-hidden sm:py-12'
					ref={movieListContainer}
					style={{ scrollBehavior: 'smooth' }}>
					<div className='flex flex-no-wrap px-4 sm:px-10'>
						{movieList.map((movie) => {
							return <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} />;
						})}
					</div>
				</div>
				{showRightButton && (
					<button
						className={
							(hoverOnContainer ? 'opacity-100 ' : 'opacity-0 ') +
							'w-16 h-3/4 top-auto right-0 z-20 absolute bg-gradient-to-l from-black to-transparent transition-all duration-200 ease-in-out focus:outline-none'
						}
						onClick={() => scrollToRight()}>
						<svg
							viewBox='0 0 284.935 284.936'
							style={{ enableBackground: 'new 0 0 284.935 284.936' }}
							className='w-8 mx-auto fill-current'>
							<path
								d='M222.701,135.9L89.652,2.857C87.748,0.955,85.557,0,83.084,0c-2.474,0-4.664,0.955-6.567,2.857L62.244,17.133
								c-1.906,1.903-2.855,4.089-2.855,6.567c0,2.478,0.949,4.664,2.855,6.567l112.204,112.204L62.244,254.677
								c-1.906,1.903-2.855,4.093-2.855,6.564c0,2.477,0.949,4.667,2.855,6.57l14.274,14.271c1.903,1.905,4.093,2.854,6.567,2.854
								c2.473,0,4.663-0.951,6.567-2.854l133.042-133.044c1.902-1.902,2.854-4.093,2.854-6.567S224.603,137.807,222.701,135.9z'
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
};

export default MovieList;
