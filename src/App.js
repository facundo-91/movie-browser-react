import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MoviesProvider } from './contexts/MoviesContext';
import NavRoute from './pages/NavRoute';
import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MovieInfo from './pages/MovieInfo';
import SearchResult from './pages/SearchResult';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<MoviesProvider>
					<Switch>
						<NavRoute exact path='/' component={Dashboard} />
						<NavRoute path='/movie/:id' component={MovieInfo} />
						<NavRoute path='/search/:query' component={SearchResult} />
						<NavRoute path='/profile' component={() => <PrivateRoute component={Profile} />} />
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route path='/forgot-password' component={ForgotPassword} />
					</Switch>
				</MoviesProvider>
			</AuthProvider>
		</Router>
	);
};

export default App;
