const MovieDetailsRuntime = ({ data }) => {
	const convertMovieRuntime = (minutesToConvert) => {
		const min = minutesToConvert;
		const hours = min / 60;
		const roundedHours = Math.floor(hours);
		const minutes = (hours - roundedHours) * 60;
		const roundedMinutes = Math.round(minutes);

		return roundedHours === 0
			? roundedMinutes + 'min'
			: roundedHours + 'h ' + roundedMinutes + 'min';
	};

	const runtime = convertMovieRuntime(data?.runtime);
	const usaReleaseData = data?.release_dates?.results.find((x) => x.iso_3166_1 === 'US');
	const releaseDate = data?.release_date?.split('-').reverse().join('-');
	const certification = usaReleaseData?.release_dates[0].certification;

	return (
		<div className='flex justify-between max-w-xs my-4 align-middle lg:max-w-md'>
			<div className='flex items-center'>
				<img
					className='w-4 mr-1 lg:w-6 lg:mr-2'
					src='https://icongr.am/material/clock-outline.svg?size=32&color=ffffff'
					alt='Clock Icon'
				/>
				<p className='mt-px text-sm tracking-tight md:text-base lg:text-lg'>{runtime}</p>
			</div>
			<div className='flex items-center'>
				<img
					className='w-4 mr-1 lg:w-6 lg:mr-2'
					src='https://icongr.am/material/calendar-month-outline.svg?size=32&color=ffffff'
					alt='Calendar Icon'
				/>
				<p className='mt-px text-sm tracking-tight md:text-base lg:text-lg'>{releaseDate}</p>
			</div>
			<div className='px-1 my-auto border rounded border-white-custom lg:px-2'>
				<p className='text-sm lg:text-lg'>{certification}</p>
			</div>
		</div>
	);
};

export default MovieDetailsRuntime;
