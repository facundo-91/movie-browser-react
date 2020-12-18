import { useEffect, useState } from 'react';

const MovieInfo = ({ match }) => {
	// States
	const [movieInfo, setMovieInfo] = useState([]);

	// Effects
	useEffect(() => {
		const getMovieInfo = async () => {
			const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setMovieInfo(responseJson);
		};
		getMovieInfo();
	}, [match.params.id, setMovieInfo]);

	return (
		<div
			className='bg-cover h-screen w-auto'
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path})`,
			}}>
			<div>
				<p>{movieInfo.title}</p>
			</div>
		</div>
	);
};

export default MovieInfo;
