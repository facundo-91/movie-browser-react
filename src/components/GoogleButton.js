import GoogleButtonIcon from './GoogleButtonIcon';

const GoogleButton = ({ onClick }) => {
	return (
		<button className='relative w-full h-12 p-px my-2 rounded bg-blue-google' onClick={onClick}>
			<GoogleButtonIcon />
			Sign In with Google
		</button>
	);
};

export default GoogleButton;
