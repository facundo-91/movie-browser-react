const MovieDetailsGenres = ({ data }) => {
	return (
		<div className='flex flex-wrap my-4 gap-x-2 gap-y-2 lg:my-5'>
			{data?.genres?.map((genre) => (
				<span
					key={genre.id}
					className='px-2 text-sm font-bold border rounded border-white-custom lg:text-lg'>
					{genre.name}
				</span>
			))}
		</div>
	);
};

export default MovieDetailsGenres;
