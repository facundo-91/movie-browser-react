import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MoviesContext';
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
			const trimedInput = searchInputValue.trim();
			if (trimedInput.length > 0) {
				const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${trimedInput}`;
				const response = await fetch(url);
				const responseJson = await response.json();
				setSearchResult(responseJson.results);
				history.replace(`/search/${trimedInput}`);
			} else {
				setSearchResult([]);
				history.replace(`/`);
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
				'flex items-center w-full h-14 fixed z-30 transition-colors duration-500 bg-gray-custom ' +
				(scrollPosition > 30 ? 'bg-opacity-100' : 'bg-opacity-10')
			}>
			<div className='flex items-center justify-between w-full mx-1/20'>
				<Link to='/' className='flex-shrink-0 w-7 h-7'>
					<img className='w-auto h-auto' src={appLogo} alt='App logo'></img>
				</Link>
				<div className='flex items-center justify-end'>
					<input
						className='w-8 h-8 pl-8 mx-4 text-sm font-light placeholder-transparent transition-all duration-700 bg-transparent border border-transparent cursor-pointer focus:placeholder-gray-input-text focus:cursor-text focus:pr-3 focus:w-full focus:bg-black-custom focus:border-white-custom focus:outline-none md:text-base'
						type='search'
						onChange={(e) => setSearchInputValue(e.target.value)}
						value={searchInputValue}
						placeholder='Enter a movie title'
						style={{
							backgroundImage: 'url(https://icongr.am/material/magnify.svg?size=24&color=ffffff)',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: '3px 3px',
						}}></input>
					{currentUser ? (
						<div className='relative z-30'>
							<button
								className='relative z-20 block w-10 h-10 overflow-hidden border-2 border-transparent rounded-full focus:outline-none focus:border-white-custom focus:border-opacity-50 hover:border-white-custom'
								onClick={() => setShowDiv(!showDiv)}>
								<img
									className='object-cover w-full h-full'
									src={
										currentUser.photoURL != null
											? currentUser.photoURL
											: 'https://icongr.am/material/account-circle.svg?size=36&color=ffffff'
									}
									alt='Profile'></img>
							</button>
							<button
								className='fixed inset-0 w-full h-full bg-black opacity-25 cursor-default'
								style={{ display: showDiv ? 'block' : 'none' }}
								onClick={() => setShowDiv(false)}
								tabIndex='-1'></button>
							<div
								className='fixed top-0 right-0 w-0 h-screen overflow-hidden duration-300 border-t border-b border-l shadow-md transition-width bg-gray-custom md:h-0 md:w-52 md:transition-height md:duration-300 md:right-1/25 md:border-t-0 md:border-r'
								style={{
									borderColor: showDiv ? 'rgba(51, 51, 51, 1)' : 'rgba(51, 51, 51, 0)',
									width: showDiv && window.matchMedia('(max-width: 767px)').matches ? '15rem' : '',
									height: showDiv && window.matchMedia('(min-width: 768px)').matches ? '195px' : '',
								}}>
								<div className='py-2'>
									<div className='mx-4'>
										<p className='text-xl font-bold leading-10'>{currentUser.displayName}</p>
									</div>
									<hr className='mx-3 my-2 border-gray-input'></hr>
									<Link
										to='/profile'
										className='flex items-center w-full px-3 py-4 text-xl text-white-custom hover:bg-white-custom hover:bg-opacity-25 md:text-base md:py-2'>
										<img
											src='https://icongr.am/material/account-box.svg?size=24&color=ffffff'
											alt='profile icon'
											className='w-8 h-8 mr-2 md:w-6 md:h-6'></img>
										Profile
									</Link>
									<Link
										to='/watchlist'
										className='flex items-center px-3 py-4 text-xl text-white-custom hover:bg-white-custom hover:bg-opacity-25 md:text-base md:py-2'>
										<img
											src='https://icongr.am/material/plus.svg?size=24&color=ffffff'
											alt='watchlist icon'
											className='w-8 h-8 mr-2 md:w-6 md:h-6'></img>
										Watchlist
									</Link>
									<button
										className='flex items-center w-full px-3 py-4 text-xl text-left text-white-custom hover:bg-white-custom hover:bg-opacity-25 md:text-base md:py-2'
										onClick={signOut}>
										<img
											src='https://icongr.am/material/exit-to-app.svg?size=24&color=ffffff'
											alt='sign out icon'
											className='w-8 h-8 mr-2 md:w-6 md:h-6'></img>
										Sign Out
									</button>
								</div>
							</div>
						</div>
					) : (
						<Link
							to='/signin'
							className='flex items-center justify-center flex-shrink-0 w-20 h-8 text-base font-medium rounded-sm bg-red-custom text-white-custom'>
							Sign In
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
