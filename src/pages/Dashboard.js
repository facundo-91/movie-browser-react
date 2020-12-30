import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import MovieHero from '../components/MovieHero';

const Dashboard = () => {
	// States
	const [trendingList, setTrendingList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);
	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);
	const [movieHeroID, setMovieHeroID] = useState();

	// Effects
	useEffect(() => {
		const getTrendingList = async () => {
			const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setTrendingList(responseJson.results);
		};
		const getNowPlayingList = async () => {
			const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setNowPlayingList(responseJson.results);
		};
		const getUpcomingList = async () => {
			const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setUpcomingList(responseJson.results);
		};
		const getTopRatedList = async () => {
			const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setTopRatedList(responseJson.results);
		};
		getTrendingList();
		getNowPlayingList();
		getUpcomingList();
		getTopRatedList();
	}, []);

	useEffect(() => {
		if (trendingList.length > 0) setMovieHeroID(trendingList[0].id);
	}, [trendingList]);

	return (
		<div className='bg-black-custom text-white-custom'>
			<MovieHero id={movieHeroID} />
			<div className='pb-2 -mt-screen-20 bg-opacity-100'>
				<MovieList title='Trending Today' movieList={trendingList} />
				<MovieList title='Now Playing' movieList={nowPlayingList} />
				<MovieList title='Upcoming Movies' movieList={upcomingList} />
				<MovieList title='Top Rated' movieList={topRatedList} />
			</div>
		</div>
	);
};

export default Dashboard;
