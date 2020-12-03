import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';

const Dashboard = () => {
	// States
	const [searchResult, setSearchResult] = useState([]);
	const [trendingList, setTrendingList] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [topRated, setTopRated] = useState([]);

	// Methods
	const handleSearch = async (searchValue) => {
		const query = searchValue.trim();
		if (query.length > 0) {
			const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${query}`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setSearchResult(responseJson.results);
		} else {
			setSearchResult([]);
		}
	};
	const getTrendingRequest = async () => {
		const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		setTrendingList(responseJson.results);
	};
	const getNowPlayingRequst = async () => {
		const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		setNowPlaying(responseJson.results);
	};
	const getUpcomingRequst = async () => {
		const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		setUpcoming(responseJson.results);
	};
	const getTopRated = async () => {
		const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		setTopRated(responseJson.results);
	};

	useEffect(() => {
		getTrendingRequest();
		getNowPlayingRequst();
		getUpcomingRequst();
		getTopRated();
	}, []);

	return (
		<>
			<Navbar handleSearch={handleSearch} />
			<div className='pt-4 bg-black-custom text-white-custom'>
				<MovieList
					searchResult={searchResult}
					trendingList={trendingList}
					nowPlaying={nowPlaying}
					upcoming={upcoming}
					topRated={topRated}
				/>
			</div>
		</>
	);
};

export default Dashboard;
