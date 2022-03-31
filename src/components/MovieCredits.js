import { useEffect, useState } from 'react';
import MovieCreditsCard from './MovieCreditsCard';
import MovieCreditsShowMoreButton from './MovieCreditsShowMoreButton';

const MovieCredits = ({ movieInfo }) => {
	const [personsToShow, setPersonsToShow] = useState(12);
	const [showMore, setShowMore] = useState(true);

	const crewList = movieInfo?.credits?.crew?.filter(
		(crewMember) =>
			crewMember.job === 'Director' ||
			crewMember.job === 'Screenplay' ||
			crewMember.job === 'Characters' ||
			crewMember.job === 'Novel'
	);
	const castList = movieInfo?.credits?.cast;

	useEffect(() => {
		showMore ? setPersonsToShow(12) : setPersonsToShow(castList.length);
	}, [showMore, castList]);

	return (
		<section className='max-w-screen-lg px-3 py-6 mx-auto bg-gray-custom'>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Crew</h1>
			<div className='flex flex-wrap justify-start'>
				{crewList?.map((person) => (
					<MovieCreditsCard key={`${person.id}-${person.credit_id}`} person={person} />
				))}
			</div>
			<h1 className='mx-1 text-xl font-bold md:text-2xl'>Cast</h1>
			<div className='flex flex-wrap justify-start'>
				{castList?.slice(0, personsToShow).map((person) => (
					<MovieCreditsCard key={person.id} person={person} />
				))}
				{castList?.length > 12 && (
					<MovieCreditsShowMoreButton showMore={showMore} setShowMore={setShowMore} />
				)}
			</div>
		</section>
	);
};

export default MovieCredits;
