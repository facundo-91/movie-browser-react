import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import MovieCredits from '../components/MovieCredits';
import MovieTrailer from '../components/MovieTrailer';
import MovieRecommendations from '../components/MovieRecommendations';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFullMovieInfo } from '../services/api';

const MovieInfo = () => {
	const { id } = useParams();
	const [movieInfo, setMovieInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch and save movie info
	useEffect(() => {
		const fetch = async () => {
			try {
				setIsLoading(true);
				const response = await getFullMovieInfo(id);
				setMovieInfo(response);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetch();
	}, [id]);

	const backgroundImage =
		movieInfo?.backdrop_path !== undefined
			? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movieInfo?.backdrop_path})`
			: 'none';

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<main
			className='bg-fixed bg-center bg-cover'
			style={{
				backgroundImage: backgroundImage,
			}}>
			<div className='w-full py-20 mx-auto px-1/20'>
				<MovieDetails movieInfo={movieInfo} />
				<MovieCredits movieInfo={movieInfo} />
				<MovieTrailer movieInfo={movieInfo} />
				<MovieRecommendations movieInfo={movieInfo} />
			</div>
		</main>
	);
};

export default MovieInfo;
