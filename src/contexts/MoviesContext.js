import { createContext, useContext, useState } from 'react';

// Context
const MoviesContext = createContext(null);

// Custom Hook
const useMovies = () => {
	return useContext(MoviesContext);
};

// Provider
const MoviesProvider = ({ children }) => {
	// States
	const [searchInputValue, setSearchInputValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	// Methods and states to pass to the Provider
	const value = {
		searchInputValue,
		setSearchInputValue,
		searchResult,
		setSearchResult,
	};

	return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};

export { MoviesContext as default, MoviesProvider, useMovies };
