import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ exact, path, component: Component }) => {
	const { currentUser } = useAuth();

	return currentUser ? (
		<Route exact={exact} path={path} render={(props) => <Component {...props} />} />
	) : (
		<Redirect to='/signin' />
	);
};

export default PrivateRoute;
