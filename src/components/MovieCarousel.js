import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import MovieCard from '../components/MovieCard';

const MovieCarousel = ({ title, movieList }) => {
	SwiperCore.use([Navigation, Pagination]);

	return (
		<div className='mb-6 md:mb-0'>
			<div className='mb-1 ml-1/20 md:-mb-1/20'>
				<h3 className='ml-px text-lg font-bold md:text-1.5vw'>{title}</h3>
			</div>
			<Swiper
				className='px-1/20 md:pt-1/25 md:pb-3/50'
				slidesPerView={3}
				slidesPerGroup={3}
				spaceBetween={8}
				simulateTouch={false}
				navigation
				pagination
				watchOverflow
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
							className='transition-all duration-200 transform hover:delay-500 hover:z-10 md:hover:scale-150'>
							<MovieCard id={movie.id} poster={movie.poster_path} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default MovieCarousel;
