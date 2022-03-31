import { useState, useEffect } from 'react';
import DashboardHero from '../components/DashboardHero';
import MoviesCarousel from '../components/MoviesCarousel';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardInfo } from '../services/api';

const Dashboard = () => {
	const [popularList, setPopularList] = useState(null);
	const [nowPlayingList, setNowPlayingList] = useState(null);
	const [upcomingList, setUpcomingList] = useState(null);
	const [topRatedList, setTopRatedList] = useState(null);
	const [heroMovieData, setHeroMovieData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch and save all the lists of movies
	useEffect(() => {
		const fetch = async () => {
			try {
				setIsLoading(true);
				const { popularList, nowPlayingList, upcomingList, topRatedList, heroMovieInfo } =
					await getDashboardInfo();
				setPopularList(popularList);
				setNowPlayingList(nowPlayingList);
				setUpcomingList(upcomingList);
				setTopRatedList(topRatedList);
				setHeroMovieData(heroMovieInfo);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetch();
	}, []);

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<>
			<DashboardHero movieInfo={heroMovieData} />
			<main className='relative pt-0 pb-2 md:-mt-1/8'>
				<MoviesCarousel title='Popular Today' movieList={popularList} />
				<MoviesCarousel title='Now Playing' movieList={nowPlayingList} />
				<MoviesCarousel title='Upcoming Movies' movieList={upcomingList} />
				<MoviesCarousel title='Top Rated' movieList={topRatedList} />
			</main>
		</>
	);
};

export default Dashboard;
