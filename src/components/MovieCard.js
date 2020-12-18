import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	return (
		<Link
			to={`/movie/${id}`}
			className='mx-1 transform transition duration-100 z-0 hover:scale-125 hover:z-10 min-w-10'>
			<img
				className='align-middle'
				src={poster ? 'https://image.tmdb.org/t/p/w500' + poster : posterPlaceholder}
				alt='Movie Poster'></img>
		</Link>
	);
};

export default MovieCard;
