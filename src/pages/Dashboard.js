import { useState, useEffect } from 'react';
import MovieHero from '../components/MovieHero';
import MovieCarousel from '../components/MovieCarousel';

const Dashboard = () => {
	// States
	const [popularList, setPopularList] = useState([]);
	const [upcomingList, setUpcomingList] = useState([]);
	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [topRatedList, setTopRatedList] = useState([]);
	const [movieHeroID, setMovieHeroID] = useState();

	// Fetch all the lists of movies
	useEffect(() => {
		const getPopularList = async () => {
			const page1Url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}`;
			const page1Response = await fetch(page1Url);
			const page1ResponseJson = await page1Response.json();
			const page2Url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
			const page2Response = await fetch(page2Url);
			const page2ResponseJson = await page2Response.json();
			setPopularList(page1ResponseJson.results.concat(page2ResponseJson.results));
		};
		const getNowPlayingList = async () => {
			const page1Url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}`;
			const page1Response = await fetch(page1Url);
			const page1ResponseJson = await page1Response.json();
			const page2Url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
			const page2Response = await fetch(page2Url);
			const page2ResponseJson = await page2Response.json();
			setNowPlayingList(page1ResponseJson.results.concat(page2ResponseJson.results));
		};
		const getUpcomingList = async () => {
			const page1Url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`;
			const page1Response = await fetch(page1Url);
			const page1ResponseJson = await page1Response.json();
			const page2Url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
			const page2Response = await fetch(page2Url);
			const page2ResponseJson = await page2Response.json();
			setUpcomingList(page1ResponseJson.results.concat(page2ResponseJson.results));
		};
		const getTopRatedList = async () => {
			const page1Url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`;
			const page1Response = await fetch(page1Url);
			const page1ResponseJson = await page1Response.json();
			const page2Url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
			const page2Response = await fetch(page2Url);
			const page2ResponseJson = await page2Response.json();
			setTopRatedList(page1ResponseJson.results.concat(page2ResponseJson.results));
		};
		getPopularList();
		getNowPlayingList();
		getUpcomingList();
		getTopRatedList();
	}, []);

	// Set a random movie for the Hero section
	useEffect(() => {
		if (popularList.length > 0) {
			const randomIndex = Math.floor(Math.random() * 10 + 1);
			setMovieHeroID(popularList[randomIndex].id);
		}
	}, [popularList]);

	return (
		<>
			<MovieHero id={movieHeroID} />
			<div className='relative pt-0 pb-2 md:-mt-1/8'>
				<MovieCarousel title='Popular Today' movieList={popularList} />
				<MovieCarousel title='Now Playing' movieList={nowPlayingList} />
				<MovieCarousel title='Upcoming Movies' movieList={upcomingList} />
				<MovieCarousel title='Top Rated' movieList={topRatedList} />
			</div>
		</>
	);
};

export default Dashboard;
