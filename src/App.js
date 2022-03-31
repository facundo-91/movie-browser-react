import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MoviesProvider } from './contexts/MoviesContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import LoadingSpinner from './components/LoadingSpinner';
import NavContainer from './components/NavContainer';
import PrivateRoute from './pages/PrivateRoute';
import SearchResult from './pages/SearchResult';
import Dashboard from './pages/Dashboard';
const MovieInfo = lazy(() => import('./pages/MovieInfo'));
const Profile = lazy(() => import('./pages/Profile'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const UpdateEmail = lazy(() => import('./pages/UpdateEmail'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const UpdateUser = lazy(() => import('./pages/UpdateUser'));
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'));

const App = () => {
	return (
		<Router basename='/movie-browser-react'>
			<Suspense fallback={<LoadingSpinner />}>
				<AuthProvider>
					<FirestoreProvider>
						<MoviesProvider>
							<Switch>
								<Route exact path='/signin' children={<SignIn />} />
								<Route exact path='/signup' children={<SignUp />} />
								<Route exact path='/forgot-password' children={<ForgotPassword />} />
								<NavContainer>
									<Route exact path='/' children={<Dashboard />} />
									<Route exact path='/movie/:id' children={<MovieInfo />} />
									<Route exact path='/search/:query' children={<SearchResult />} />
									<PrivateRoute exact path='/profile' children={<Profile />} />
									<PrivateRoute exact path='/update-email' children={<UpdateEmail />} />
									<PrivateRoute exact path='/update-password' children={<UpdatePassword />} />
									<PrivateRoute exact path='/update-user' children={<UpdateUser />} />
									<PrivateRoute exact path='/delete-account' children={<DeleteAccount />} />
									<PrivateRoute exact path='/watchlist' children={<Watchlist />} />
								</NavContainer>
							</Switch>
						</MoviesProvider>
					</FirestoreProvider>
				</AuthProvider>
			</Suspense>
		</Router>
	);
};

export default App;
