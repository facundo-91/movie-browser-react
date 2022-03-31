const MovieCreditsCard = ({ person }) => {
	return (
		<div className='w-1/3 px-1 my-2 md:my-4 md:w-1/6'>
			{person.profile_path ? (
				<img
					loading='lazy'
					src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
					alt='Crew Profile'
					className='w-full h-auto mx-0 my-2 rounded'
				/>
			) : (
				<div className='flex justify-center align-middle'>
					<img
						src='https://icongr.am/fontawesome/user.svg?size=128&color=141414'
						alt='Crew Profile'
						className='w-full my-2 rounded py-1/4 bg-white-custom'
					/>
				</div>
			)}
			<p className='text-sm font-bold md:text-base'>{person.name}</p>
			<p className='text-xs md:text-sm'>{person.job || person.character}</p>
		</div>
	);
};

export default MovieCreditsCard;
