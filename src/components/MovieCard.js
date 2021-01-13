import { Link } from 'react-router-dom';
import posterPlaceholder from '../assets/poster-placeholder.png';

const MovieCard = ({ poster, id }) => {
	return (
		<div className='z-0 w-1/3 transition duration-100 transform min-w-1/3 sm:w-1/8 sm:min-w-1/8 sm:hover:scale-150 hover:z-10'>
			<div className='mx-1 my-2'>
				<Link to={`/movie/${id}`} tabIndex='-1'>
					<img
						src={poster ? 'https://image.tmdb.org/t/p/w500' + poster : posterPlaceholder}
						alt='Movie Poster'></img>
				</Link>
			</div>
		</div>
	);
};

export default MovieCard;
