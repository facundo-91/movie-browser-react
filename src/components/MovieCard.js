import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	const posterImg = poster ? `https://image.tmdb.org/t/p/w500${poster}` : posterPlaceholder;

	return (
		<Link to={`/movie/${id}`} tabIndex='-1'>
			<img
				loading='lazy'
				src={posterImg}
				alt='Movie Poster'
				className='object-cover h-full duration-200 rounded md:hover:shadow-custom hover:delay-200'
			/>
		</Link>
	);
};

export default MovieCard;
