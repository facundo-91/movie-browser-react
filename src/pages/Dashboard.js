import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
	const { currentUser, signOut } = useAuth();

	return(
		<>
			<p>Profile</p>
			<p>Email: {currentUser.email}</p>
			<button onClick={signOut}>Sign Out</button>
		</>
	) 
};

export default Dashboard;