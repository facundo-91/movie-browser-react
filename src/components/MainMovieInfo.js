import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

const MainMovieInfo = ({ movieData }) => {
	const { currentUser } = useAuth();
	const { addMovie, removeMovie, moviesWatchlist } = useFirestore();
	const [watchlisted, setWatchlisted] = useState(false);
	const [runtime, setRuntime] = useState('');
	const [rating, setRating] = useState(null);
	const [certification, setCertification] = useState('');
	const [hoverOnButton, setHoverOnButton] = useState(false);

	// Effects
	// Check if movie is watchlisted
	useEffect(() => {
		const watchlistState = moviesWatchlist.some((movie) => movie.movie_id === movieData.id);
		setWatchlisted(watchlistState);
	}, [moviesWatchlist, movieData.id]);

	// Convert runtime in minutes to hr and min
	useEffect(() => {
		const movieRuntime = (minutesToConvert) => {
			const min = minutesToConvert;
			const hours = min / 60;
			const roundedHours = Math.floor(hours);
			const minutes = (hours - roundedHours) * 60;
			const roundedMinutes = Math.round(minutes);
			roundedHours === 0
				? setRuntime(roundedMinutes + 'min')
				: setRuntime(roundedHours + 'h ' + roundedMinutes + 'min');
		};
		if (Object.entries(movieData) !== 0) {
			movieRuntime(movieData.runtime);
		}
	}, [movieData]);

	// Save rating number
	useEffect(() => {
		if (Object.entries(movieData) !== 0) {
			setRating(movieData.vote_average * 10);
		}
	}, [movieData]);

	// Save certification
	useEffect(() => {
		if (movieData.hasOwnProperty('release_dates')) {
			const usaRelease = movieData.release_dates.results.find((x) => x.iso_3166_1 === 'US');
			const cert = usaRelease ? usaRelease.release_dates[0].certification : null;
			setCertification(cert);
		}
	}, [movieData]);

	return (
		<div className='flex flex-col mx-4 bg-opacity-50 bg-black-custom md:flex-row xl:mx-0'>
			<div className='relative w-full max-w-lg md:max-w-xs lg:max-w-sm'>
				<img
					className='w-full h-auto'
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt='Movie Poster'></img>
				{watchlisted ? (
					<button
						className='absolute bottom-0 right-0 w-12 h-12 px-1.5 py-1.5 mx-2 my-2 border-2 rounded-full bg-white-custom border-white-custom focus:outline-none'
						onClick={() => removeMovie(`${movieData.id}`)}>
						<img
							className='w-full h-auto'
							src='https://icongr.am/material/check.svg?size=64&color=000000'
							alt='Remove from Watchlist Icon'></img>
					</button>
				) : (
					<>
						<button
							className='absolute bottom-0 right-0 w-12 h-12 mx-2 my-2 bg-black bg-opacity-75 border-2 rounded-full border-white-custom focus:outline-none hover:bg-opacity-100 hover:border-black hover:invert hover:filter'
							onClick={() => (currentUser ? addMovie(movieData.id, movieData.poster_path) : null)}
							onMouseEnter={() => setHoverOnButton(true)}
							onMouseLeave={() => setHoverOnButton(false)}>
							<img
								className='w-full h-auto'
								src='https://icongr.am/material/plus.svg?size=64&color=ffffff'
								alt='Add to Watchlist Icon'></img>
						</button>
						{hoverOnButton && !currentUser && (
							<div className='absolute right-0 z-0 flex items-center justify-center w-48 h-16 mt-1.5 mr-2.5 text-sm border rounded border-white-custom bg-black-custom md:w-44 md:h-14 md:text-xs lg:text-sm lg:w-48 lg:h-16 2xl:text-lg 2xl:w-60 2xl:h-20'>
								<p className='px-4 text-center'>Sign in to add the movie to Watchlist</p>
								<span className='absolute right-0 w-3.5 h-3.5 mr-3.5 transform rotate-45 border-t border-l -top-1/8 -z-1 border-white-custom bg-black-custom'></span>
							</div>
						)}
					</>
				)}
			</div>
			<div className='w-full px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8'>
				<p className='text-2xl font-bold tracking-tight lg:text-4xl'>
					{movieData.title}
					<span className='font-normal'> ({movieData.release_date.slice(0, 4)})</span>
				</p>
				<div className='my-2 text-lg italic lg:text-xl'>
					<p>{movieData.tagline}</p>
				</div>
				<div className='flex my-2 lg:my-4'>
					<div className='flex items-center'>
						<svg
							className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
							viewBox='0 0 2000 2000'
							style={{
								fillRule: rating >= 20 ? 'nonzero' : 'evenodd',
								clipRule: 'evenodd',
								strokeLinejoin: 'round',
								strokeMiterlimit: '2',
							}}>
							<g>
								<path
									d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
									className={'fill-current text-white-custom text-opacity-0'}
								/>
								<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
							</g>
						</svg>
						<svg
							className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
							viewBox='0 0 2000 2000'
							style={{
								fillRule: rating >= 40 ? 'nonzero' : 'evenodd',
								clipRule: 'evenodd',
								strokeLinejoin: 'round',
								strokeMiterlimit: '2',
							}}>
							<g>
								<path
									d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
									className={'fill-current text-white-custom text-opacity-0'}
								/>
								<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
							</g>
						</svg>
						<svg
							className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
							viewBox='0 0 2000 2000'
							style={{
								fillRule: rating >= 60 ? 'nonzero' : 'evenodd',
								clipRule: 'evenodd',
								strokeLinejoin: 'round',
								strokeMiterlimit: '2',
							}}>
							<g>
								<path
									d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
									className={'fill-current text-white-custom text-opacity-0'}
								/>
								<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
							</g>
						</svg>
						<svg
							className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
							viewBox='0 0 2000 2000'
							style={{
								fillRule: rating >= 80 ? 'nonzero' : 'evenodd',
								clipRule: 'evenodd',
								strokeLinejoin: 'round',
								strokeMiterlimit: '2',
							}}>
							<g>
								<path
									d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
									className={'fill-current text-white-custom text-opacity-0'}
								/>
								<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
							</g>
						</svg>
						<svg
							className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
							viewBox='0 0 2000 2000'
							style={{
								fillRule: rating >= 100 ? 'nonzero' : 'evenodd',
								clipRule: 'evenodd',
								strokeLinejoin: 'round',
								strokeMiterlimit: '2',
							}}>
							<g>
								<path
									d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
									className={'fill-current text-white-custom text-opacity-0'}
								/>
								<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
							</g>
						</svg>
					</div>
					<div className='flex items-center ml-1 lg:ml-4'>
						<p className='font-bold lg:text-2xl lg:mr-2'>{movieData.vote_average}</p>
					</div>
				</div>
				<div className='flex justify-between max-w-xs my-4 align-middle lg:max-w-md'>
					<div className='flex items-center'>
						<img
							className='w-4 mr-1 lg:w-6 lg:mr-2'
							src='https://icongr.am/material/clock-outline.svg?size=32&color=ffffff'
							alt='Clock Icon'></img>
						<p className='mt-px text-sm tracking-tight md:text-base lg:text-lg'>{runtime}</p>
					</div>
					<div className='flex items-center'>
						<img
							className='w-4 mr-1 lg:w-6 lg:mr-2'
							src='https://icongr.am/material/calendar-month-outline.svg?size=32&color=ffffff'
							alt='Calendar Icon'></img>
						<p className='mt-px text-sm tracking-tight md:text-base lg:text-lg'>
							{movieData.release_date.split('-').reverse().join('-')}
						</p>
					</div>
					<div className='px-1 my-auto border rounded border-white-custom lg:px-2'>
						<p className='text-sm lg:text-lg'>{certification}</p>
					</div>
				</div>
				<div className='flex flex-wrap my-4 gap-x-2 gap-y-2 lg:my-5'>
					{movieData.genres.map((x) => (
						<span
							key={x.id}
							className='px-2 text-sm font-bold border rounded border-white-custom lg:text-lg'>
							{x.name}
						</span>
					))}
				</div>
				<div className='mt-4 text-base md:text-sm lg:mt-6 lg:text-lg xl:text-lg'>
					<p>{movieData.overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MainMovieInfo;
