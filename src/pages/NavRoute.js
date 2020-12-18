import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NavRoute = ({ exact, path, component: Component }) => (
	<Route
		exact={exact}
		path={path}
		render={(props) => (
			<>
				<Navbar />
				<Component {...props} />
			</>
		)}
	/>
);

export default NavRoute;
