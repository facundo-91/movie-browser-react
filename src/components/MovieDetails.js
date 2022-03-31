import MovieDetailsPoster from './MovieDetailsPoster';
import MovieDetailsTitle from './MovieDetailsTitle';
import MovieDetailsRating from './MovieDetailsRating';
import MovieDetailsRuntime from './MovieDetailsRuntime';
import MovieDetailsGenres from './MovieDetailsGenres';
import MovieDetailsOverview from './MovieDetailsOverview';

const MovieDetails = ({ movieInfo }) => {
	const {
		poster_path,
		id,
		title,
		release_date,
		tagline,
		vote_average,
		runtime,
		release_dates,
		genres,
		overview,
	} = movieInfo || {};
	const posterData = { poster_path, id };
	const titleData = { title, release_date, tagline };
	const ratingData = { vote_average };
	const runtimeData = { runtime, release_dates, release_date };
	const genresData = { genres };
	const overviewData = { overview };

	return (
		<section className='flex flex-col max-w-screen-lg mx-auto bg-opacity-50 bg-black-custom md:flex-row'>
			<MovieDetailsPoster data={posterData} />
			<div className='w-full px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8'>
				<MovieDetailsTitle data={titleData} />
				<MovieDetailsRating data={ratingData} />
				<MovieDetailsRuntime data={runtimeData} />
				<MovieDetailsGenres data={genresData} />
				<MovieDetailsOverview data={overviewData} />
			</div>
		</section>
	);
};

export default MovieDetails;
