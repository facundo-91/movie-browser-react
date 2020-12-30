import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	return (
		<div className='w-12.5 transform transition duration-100 z-0 hover:scale-125 hover:z-10'>
			<div className='mx-1 mb-2 '>
				<Link to={`/movie/${id}`}>
					<img
						src={poster ? 'https://image.tmdb.org/t/p/w500' + poster : posterPlaceholder}
						alt='Movie Poster'></img>
				</Link>
			</div>
		</div>
	);
};

export default MovieCard;
