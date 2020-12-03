import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MovieInfo from './pages/MovieInfo';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route path='/movie/:id' component={MovieInfo} />
					<PrivateRoute path='/profile' component={Profile} />
					<Route path='/signin' component={SignIn} />
					<Route path='/signup' component={SignUp} />
					<Route path='/forgot-password' component={ForgotPassword} />
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default App;
