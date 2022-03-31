import Navbar from './Navbar';

const NavContainer = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default NavContainer;
