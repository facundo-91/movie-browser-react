import { useEffect, useState } from 'react';
import MainMovieInfo from '../components/MainMovieInfo';
import ActorsInfo from '../components/ActorsInfo';
import MovieTrailer from '../components/MovieTrailer';
import MovieRecommendations from '../components/MovieRecommendations';

const MovieInfo = ({ match }) => {
	// Hooks
	const [movieInfo, setMovieInfo] = useState({});
	const [loading, setLoading] = useState(true);

	// Effects
	// Fetch Movie Info
	useEffect(() => {
		const getMovieInfo = async () => {
			try {
				setLoading(true);
				const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_TMDB_API}&append_to_response=release_dates,credits,videos,recommendations`;
				const response = await fetch(url);
				const responseJson = await response.json();
				setMovieInfo(responseJson);
				setLoading(false);
			} catch (e) {
				console.error(e);
			}
		};
		getMovieInfo();
	}, [match.params.id, setMovieInfo]);

	return (
		!loading && (
			<div
				className='bg-fixed bg-center bg-cover'
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`,
				}}>
				<div className='w-full py-20 mx-auto px-1/20'>
					<MainMovieInfo movieData={movieInfo} />
					<ActorsInfo movieData={movieInfo} />
					<MovieTrailer movieData={movieInfo} />
					<MovieRecommendations movieData={movieInfo} />
				</div>
			</div>
		)
	);
};

export default MovieInfo;
