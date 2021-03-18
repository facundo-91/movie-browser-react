import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	return (
		<Link to={`/movie/${id}`} tabIndex='-1'>
			<img
				src={poster ? 'https://image.tmdb.org/t/p/w500' + poster : posterPlaceholder}
				alt='Movie Poster'
				className='duration-200 rounded md:hover:shadow-custom hover:delay-500'></img>
		</Link>
	);
};

export default MovieCard;
