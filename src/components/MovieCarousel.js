import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import MovieCard from '../components/MovieCard';

const MovieCarousel = ({ title, movieList }) => {
	SwiperCore.use([Navigation, Pagination]);

	return (
		<div className='mb-6 md:mb-0'>
			<div className='mb-1 ml-1/20 md:-mb-1/20 2xl:-mb-1/25 3xl:-mb-1/33'>
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
						slidesPerView: 6,
						slidesPerGroup: 6,
					},
					1280: {
						slidesPerView: 7,
						slidesPerGroup: 7,
					},
					1600: {
						slidesPerView: 8,
						slidesPerGroup: 8,
					},
				}}>
				{movieList.map((movie) => {
					return (
						<SwiperSlide
							key={movie.id}
							className='transition-transform duration-200 transform hover:delay-200 hover:z-10 md:hover:scale-125'>
							<MovieCard id={movie.id} poster={movie.poster_path} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default MovieCarousel;
