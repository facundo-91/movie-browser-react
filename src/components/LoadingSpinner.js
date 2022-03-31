const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div
				style={{ borderRightColor: 'transparent' }}
				className='w-8 h-8 border-4 rounded-full animate-spin border-red-custom'
				role='status'></div>
		</div>
	);
};

export default LoadingSpinner;
