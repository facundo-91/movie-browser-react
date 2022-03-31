import MovieDetailsRatingStar from './MovieDetailsRatingStar';

const MovieDetailsRating = ({ data }) => {
	const { vote_average } = data;
	const ratingNumber = vote_average * 10;
	const ratingText = vote_average > 0 ? vote_average.toFixed(1) : '-';

	return (
		<div className='flex my-2 lg:my-4'>
			<div className='flex items-center'>
				<MovieDetailsRatingStar fill={ratingNumber >= 20} />
				<MovieDetailsRatingStar fill={ratingNumber >= 40} />
				<MovieDetailsRatingStar fill={ratingNumber >= 60} />
				<MovieDetailsRatingStar fill={ratingNumber >= 80} />
				<MovieDetailsRatingStar fill={ratingNumber >= 100} />
			</div>
			<div className='flex items-center ml-1 lg:ml-4'>
				<p className='font-bold lg:text-2xl lg:mr-2'>{ratingText}</p>
			</div>
		</div>
	);
};

export default MovieDetailsRating;
