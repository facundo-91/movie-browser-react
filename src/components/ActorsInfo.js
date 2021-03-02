import { useState, useEffect } from 'react';

const ActorsInfo = ({ movieData }) => {
	// States
	const [showMoreContent, setShowMoreContent] = useState(0);
	const [crewInfo, setCrewInfo] = useState([]);

	// Effects
	// Save director and crew names
	useEffect(() => {
		const crew = movieData.credits.crew.filter(
			(element) =>
				element.job === 'Director' ||
				element.job === 'Screenplay' ||
				element.job === 'Characters' ||
				element.job === 'Novel'
		);
		setCrewInfo(crew);
	}, [movieData]);

	return (
		<div className='px-3 py-6 mx-4 bg-gray-custom xl:mx-0'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Crew</h1>
			<div className='flex flex-wrap justify-start'>
				{crewInfo.map((person) => {
					return (
						<div className='w-1/3 px-1 my-2 md:my-4 md:w-1/6' key={person.id}>
							{person.profile_path ? (
								<img
									src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
									alt='Crew Profile'
									className='w-full h-auto mx-0 my-2 rounded'></img>
							) : (
								<div className='flex justify-center align-middle'>
									<img
										src='https://icongr.am/fontawesome/user.svg?size=128&color=141414'
										alt='Crew Profile'
										className='w-full my-2 rounded py-1/4 bg-white-custom'></img>
								</div>
							)}
							<p className='text-sm font-bold md:text-base'>{person.name}</p>
							<p className='text-xs md:text-sm'>{person.job}</p>
						</div>
					);
				})}
			</div>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Cast</h1>
			<div className='flex flex-wrap justify-start'>
				{showMoreContent === 0 &&
					movieData.credits.cast.slice(0, 6).map((person) => {
						return (
							<div className='w-1/3 px-1 my-2 md:my-4 md:w-1/6' key={person.id}>
								{person.profile_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
										alt='Actor Profile'
										className='w-full h-auto mx-0 my-2 rounded'></img>
								) : (
									<div className='flex justify-center align-middle'>
										<img
											src='https://icongr.am/fontawesome/user.svg?size=128&color=141414'
											alt='Crew Profile'
											className='w-full my-2 rounded py-1/4 bg-white-custom'></img>
									</div>
								)}
								<p className='text-sm font-bold md:text-base'>{person.name}</p>
								<p className='text-xs md:text-sm'>{person.character}</p>
							</div>
						);
					})}
				{showMoreContent === 1 &&
					movieData.credits.cast.slice(0, 18).map((person) => {
						return (
							<div className='w-1/3 px-1 my-2 md:my-4 md:w-1/6' key={person.id}>
								{person.profile_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
										alt='Actor Profile'
										className='w-full h-auto mx-0 my-2 rounded'></img>
								) : (
									<div className='flex justify-center align-middle'>
										<img
											src='https://icongr.am/fontawesome/user.svg?size=128&color=141414'
											alt='Crew Profile'
											className='w-full my-2 rounded py-1/4 bg-white-custom'></img>
									</div>
								)}
								<p className='text-sm font-bold md:text-base'>{person.name}</p>
								<p className='text-xs md:text-sm'>{person.character}</p>
							</div>
						);
					})}
				{showMoreContent === 2 && (
					<>
						{movieData.credits.cast.map((person) => {
							return (
								<div className='w-1/3 px-1 my-2 md:my-4 md:w-1/6' key={person.id}>
									{person.profile_path ? (
										<img
											src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
											alt='Actor Profile'
											className='w-full h-auto mx-0 my-2 rounded'></img>
									) : (
										<div className='flex justify-center align-middle'>
											<img
												src='https://icongr.am/fontawesome/user.svg?size=128&color=141414'
												alt='Crew Profile'
												className='w-full my-2 rounded py-1/4 bg-white-custom'></img>
										</div>
									)}
									<p className='text-sm font-bold md:text-base'>{person.name}</p>
									<p className='text-xs md:text-sm'>{person.character}</p>
								</div>
							);
						})}
						<div className='relative flex justify-center w-full h-10 border-b-2 border-gray-input-text'>
							<button
								className='absolute bottom-0 px-2 py-2 transform translate-y-1/2 bg-opacity-75 border-2 border-white border-opacity-50 rounded-full bg-gray-input hover:bg-opacity-100 hover:border-white-custom focus:outline-none'
								onClick={() => setShowMoreContent(0)}>
								<img
									src='https://icongr.am/fontawesome/angle-up.svg?size=22&color=ffffff'
									alt='Show more icon'></img>
							</button>
						</div>
					</>
				)}
				{((showMoreContent === 0 && movieData.credits.cast.length > 6) ||
					(showMoreContent === 1 && movieData.credits.cast.length > 18)) && (
					<div className='relative flex justify-center w-full h-10 border-b-2 border-gray-input-text'>
						<button
							className='absolute bottom-0 px-2 py-2 transform translate-y-1/2 bg-opacity-75 border-2 border-white border-opacity-50 rounded-full bg-gray-input hover:bg-opacity-100 hover:border-white-custom focus:outline-none'
							onClick={() => setShowMoreContent(showMoreContent + 1)}>
							<img
								src='https://icongr.am/fontawesome/angle-down.svg?size=22&color=ffffff'
								alt='Show more icon'></img>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ActorsInfo;
