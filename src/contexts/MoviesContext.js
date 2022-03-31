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
	const [isLoading, setIsLoading] = useState(false);

	// Methods and states to pass to the Provider
	const value = {
		searchInputValue,
		setSearchInputValue,
		searchResult,
		setSearchResult,
		isLoading,
		setIsLoading,
	};

	return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};

export { MoviesContext as default, MoviesProvider, useMovies };
