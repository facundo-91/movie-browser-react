import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MoviesContext';
import defaultProfileImg from '../assets/user-profile.png';
import appLogo from '../assets/logo.png';

const Navbar = () => {
	// Hooks
	const { currentUser, signOut } = useAuth();
	const { searchInputValue, setSearchInputValue, setSearchResult } = useMovies();
	const location = useLocation();
	const history = useHistory();
	const [showDiv, setShowDiv] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

	// Effects
	// Debounce Search
	useEffect(() => {
		const handleSearch = async () => {
			if (searchInputValue.length > 0) {
				const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${searchInputValue}`;
				const response = await fetch(url);
				const responseJson = await response.json();
				setSearchResult(responseJson.results);
				history.push(`/search/${searchInputValue}`);
			} else {
				setSearchResult([]);
				history.push(`/`);
			}
		};
		const timeOutId = setTimeout(() => handleSearch(), 500);
		return () => {
			clearTimeout(timeOutId);
		};
	}, [searchInputValue, setSearchResult, history]);

	// Close profile menu on url change
	useEffect(() => {
		setShowDiv(false);
	}, [location.pathname, setShowDiv]);

	// Event listener to close profile menu with Esc
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'esc' || e.key === 'Escape') {
				setShowDiv(false);
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, []);

	// Event listener for scrolling position
	useEffect(() => {
		const handleScroll = () => {
			const position = window.pageYOffset;
			setScrollPosition(position);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav
			className={
				'flex items-center h-16 w-full fixed z-30 transition duration-700 ease-out ' +
				(scrollPosition > 0 ? 'bg-gray-custom bg-opacity-100' : 'bg-gray-custom bg-opacity-10')
			}>
			<div className='flex items-center w-full mx-2 sm:mx-10'>
				<Link to='/' className='flex-shrink-0 w-8 h-8'>
					<img className='w-auto h-auto' src={appLogo} alt='App logo'></img>
				</Link>
				<div className='relative flex-grow mx-1 sm:flex-grow-0 sm:mr-auto sm:ml-10 sm:w-64'>
					<input
						className='w-full h-8 pl-10 pr-3 text-sm font-light border border-opacity-25 rounded-3xl border-white-custom bg-black-custom text-white-custom focus:outline-none focus:border-opacity-50 hover:border-opacity-50 sm:text-base'
						type='search'
						onChange={(e) => setSearchInputValue(e.target.value)}
						value={searchInputValue}
						placeholder='Enter a movie title'></input>
					<div className='absolute top-0 left-0 my-2 ml-3'>
						<svg
							className='w-4 h-4 fill-current text-white-custom'
							viewBox='0 0 56.966 56.966'
							style={{ enableBackground: 'new 0 0 56.966 56.966' }}>
							<path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
						</svg>
					</div>
				</div>
				{currentUser ? (
					<div className='relative z-30'>
						<button
							className='relative z-20 block w-10 h-10 overflow-hidden border-2 border-transparent rounded-full focus:outline-none focus:border-white-custom focus:border-opacity-50 hover:border-white-custom'
							onClick={() => setShowDiv(!showDiv)}>
							<img
								className='object-cover w-full h-full'
								src={currentUser.photoURL != null ? currentUser.photoURL : defaultProfileImg}
								alt='Profile'></img>
						</button>
						<button
							className='fixed inset-0 w-full h-full bg-black opacity-25 cursor-default'
							style={{ display: showDiv ? 'block' : 'none' }}
							onClick={() => setShowDiv(false)}
							tabIndex='-1'></button>
						<div
							className='fixed py-2 mt-2 rounded-md shadow-md right-5 sm:right-0 w-9/10 sm:absolute sm:w-48 bg-gray-custom'
							style={{ display: showDiv ? 'block' : 'none' }}>
							<Link
								to='/profile'
								className='block px-4 py-2 text-white-custom hover:bg-white-custom hover:bg-opacity-25'>
								Profile
							</Link>
							<Link
								to='/watchlist'
								className='block px-4 py-2 text-white-custom hover:bg-white-custom hover:bg-opacity-25'>
								Watchlist
							</Link>
							<button
								className='w-full px-4 py-2 text-left text-white-custom hover:bg-white-custom hover:bg-opacity-25'
								onClick={signOut}>
								Sign Out
							</button>
						</div>
					</div>
				) : (
					<Link
						to='/signin'
						className='flex items-center justify-center flex-shrink-0 w-20 h-8 mx-1 text-sm font-medium rounded-sm bg-red-custom text-white-custom sm:text-base'>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
