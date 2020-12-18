import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const Dashboard = () => {
	// States
	const [trendingList, setTrendingList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);
	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);

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

	return (
		<div className='pt-4 pb-2 bg-black-custom text-white-custom'>
			<MovieList title='Trending Today' movieList={trendingList} />
			<MovieList title='Now Playing' movieList={nowPlayingList} />
			<MovieList title='Upcoming Movies' movieList={upcomingList} />
			<MovieList title='Top Rated' movieList={topRatedList} />
		</div>
	);
};

export default Dashboard;
