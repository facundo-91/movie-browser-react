const MovieCreditsShowMoreButton = ({ showMore, setShowMore }) => {
	const buttonIcon = showMore
		? 'https://icongr.am/fontawesome/angle-down.svg?size=22&color=ffffff'
		: 'https://icongr.am/fontawesome/angle-up.svg?size=22&color=ffffff';

	const altText = showMore ? 'Show More' : 'Show Less';

	const showMoreToggle = () => {
		setShowMore(!showMore);
	};

	return (
		<div className='relative flex justify-center w-full h-10 border-b-2 border-gray-input-text'>
			<button
				className='absolute bottom-0 px-2 py-2 transform translate-y-1/2 bg-opacity-75 border-2 border-white border-opacity-50 rounded-full bg-gray-input hover:bg-opacity-100 hover:border-white-custom focus:outline-none'
				onClick={showMoreToggle}>
				<img src={buttonIcon} alt={altText} />
			</button>
		</div>
	);
};

export default MovieCreditsShowMoreButton;
