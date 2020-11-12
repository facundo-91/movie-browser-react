import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
		<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path='/' component={Dashboard} />
					<Route path='/signin' component={SignIn}/>
					<Route path='/signup' component={SignUp}/>
					<Route path='/forgot-password' component={ForgotPassword} />
				</Switch>
			</AuthProvider>
		</Router>
  );
}

export default App;
