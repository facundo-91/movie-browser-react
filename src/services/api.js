export const getPopularList = async () => {
	const page1Url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}`;
	const page1Response = await fetch(page1Url);
	const page1ResponseJson = await page1Response.json();
	const page2Url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
	const page2Response = await fetch(page2Url);
	const page2ResponseJson = await page2Response.json();
	const popularList = page1ResponseJson.results.concat(page2ResponseJson.results);

	return popularList;
};

export const getNowPlayingList = async () => {
	const page1Url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}`;
	const page1Response = await fetch(page1Url);
	const page1ResponseJson = await page1Response.json();
	const page2Url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
	const page2Response = await fetch(page2Url);
	const page2ResponseJson = await page2Response.json();
	const nowPlayingList = page1ResponseJson.results.concat(page2ResponseJson.results);

	return nowPlayingList;
};

export const getUpcomingList = async () => {
	const page1Url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`;
	const page1Response = await fetch(page1Url);
	const page1ResponseJson = await page1Response.json();
	const page2Url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
	const page2Response = await fetch(page2Url);
	const page2ResponseJson = await page2Response.json();
	const upcomingList = page1ResponseJson.results.concat(page2ResponseJson.results);

	return upcomingList;
};

export const getTopRatedList = async () => {
	const page1Url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`;
	const page1Response = await fetch(page1Url);
	const page1ResponseJson = await page1Response.json();
	const page2Url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}&page=2`;
	const page2Response = await fetch(page2Url);
	const page2ResponseJson = await page2Response.json();
	const topRatedList = page1ResponseJson.results.concat(page2ResponseJson.results);

	return topRatedList;
};

export const getMovieInfo = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;
	const response = await fetch(url);
	const responseJson = await response.json();

	return responseJson;
};

export const getFullMovieInfo = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}&append_to_response=release_dates,credits,videos,recommendations`;
	const response = await fetch(url);
	const responseJson = await response.json();

	return responseJson;
};

export const getDashboardInfo = async () => {
	const randomIndex = Math.floor(Math.random() * 10 + 1);
	const [popularList, nowPlayingList, upcomingList, topRatedList] = await Promise.all([
		getPopularList(),
		getNowPlayingList(),
		getUpcomingList(),
		getTopRatedList(),
	]);
	const heroMovieInfo = await getMovieInfo(popularList[randomIndex].id);

	return { popularList, nowPlayingList, upcomingList, topRatedList, heroMovieInfo };
};

export const searchMovie = async (query) => {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${query}`;
	const response = await fetch(url);
	const responseJson = await response.json();

	return responseJson;
};
