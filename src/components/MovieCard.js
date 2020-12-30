import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	return (
		<div className='mr-2 min-w-10 transform transition duration-100 z-0 hover:scale-125 hover:z-10'>
			<Link to={`/movie/${id}`}>
				<img
					className='align-middle'
					src={poster ? 'https://image.tmdb.org/t/p/w500' + poster : posterPlaceholder}
					alt='Movie Poster'></img>
			</Link>
		</div>
	);
};

export default MovieCard;
