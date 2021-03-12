import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

const MovieCarousel = ({ title, movieList }) => {
	SwiperCore.use([Navigation, Pagination]);

	return (
		<div className='mb-6 md:mb-0'>
			<h3 className='ml-1/20 text-lg font-bold md:-mb-12 md:text-1.5vw'>{title}</h3>
			<Swiper
				className='py-2 px-1/20 md:py-1/20'
				slidesPerView={3}
				slidesPerGroup={3}
				spaceBetween={5}
				simulateTouch={false}
				navigation
				pagination
				watchOverflow
				roundLengths
				observer
				breakpoints={{
					768: {
						slidesPerView: 8,
						slidesPerGroup: 8,
					},
				}}>
				{movieList.map((movie) => {
					return (
						<SwiperSlide
							key={movie.id}
							className='transition-transform duration-200 transform hover:delay-500 hover:z-10 md:hover:scale-150'>
							<Link to={`/movie/${movie.id}`} tabIndex='-1'>
								<img
									src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
									alt='Movie Poster'
									className='rounded'></img>
							</Link>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default MovieCarousel;
