import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MoviesProvider } from './contexts/MoviesContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import NavRoute from './pages/NavRoute';
import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MovieInfo from './pages/MovieInfo';
import SearchResult from './pages/SearchResult';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import updateEmail from './pages/UpdateEmail';
import updatePassword from './pages/UpdatePassword';
import updateUser from './pages/UpdateUser';
import deleteAccount from './pages/DeleteAccount';

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<FirestoreProvider>
					<MoviesProvider>
						<Switch>
							<NavRoute exact path='/' component={Dashboard} />
							<NavRoute path='/movie/:id' component={MovieInfo} />
							<NavRoute path='/search/:query' component={SearchResult} />
							<NavRoute path='/profile' component={() => <PrivateRoute component={Profile} />} />
							<NavRoute
								path='/update-email'
								component={() => <PrivateRoute component={updateEmail} />}
							/>
							<NavRoute
								path='/update-password'
								component={() => <PrivateRoute component={updatePassword} />}
							/>
							<NavRoute
								path='/update-user'
								component={() => <PrivateRoute component={updateUser} />}
							/>
							<NavRoute
								path='/delete-account'
								component={() => <PrivateRoute component={deleteAccount} />}
							/>
							<NavRoute
								path='/watchlist'
								component={() => <PrivateRoute component={Watchlist} />}
							/>
							<Route path='/signin' component={SignIn} />
							<Route path='/signup' component={SignUp} />
							<Route path='/forgot-password' component={ForgotPassword} />
						</Switch>
					</MoviesProvider>
				</FirestoreProvider>
			</AuthProvider>
		</Router>
	);
};

export default App;
