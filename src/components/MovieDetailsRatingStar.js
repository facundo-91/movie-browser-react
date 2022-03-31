const MovieDetailsRatingStar = ({ fill }) => {
	const fillRule = fill ? 'nonzero' : 'evenodd';

	return (
		<svg
			className='w-5 h-5 mr-1 fill-current text-white-custom lg:w-7 lg:h-7'
			viewBox='0 0 2000 2000'
			style={{
				fillRule: `${fillRule}`,
				clipRule: 'evenodd',
				strokeLinejoin: 'round',
				strokeMiterlimit: '2',
			}}>
			<g>
				<path
					d='M1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z'
					className='text-opacity-0 fill-current text-white-custom'
				/>
				<path d='M1213.76,771.324L1803.92,803.278L1342.64,1191.83L1498.35,1797.21L999.025,1453.04L499.025,1794.87L655.698,1190.48L196.534,800.194L786.693,770.285L1000.87,181.216L1213.76,771.324ZM1391.85,1644.68L999.176,1374.02L605.687,1643.03L729.01,1167.29L363.893,856.944L833.153,833.163L1000.63,372.534L1167.12,834.043L1636.13,859.437L1269.34,1168.38L1391.85,1644.68Z' />
			</g>
		</svg>
	);
};

export default MovieDetailsRatingStar;
