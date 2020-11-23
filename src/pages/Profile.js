import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<p>Profile</p>
			<p>Email: {currentUser.email}</p>
			<Link to='/'>Dashboard</Link>
		</div>
	)
};

export default Profile;