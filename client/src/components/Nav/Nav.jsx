import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Nav.scss';

export default function Nav() {
	return (
		<nav>
			<ul className="nav-ul">
				<h1>Basket Bistro</h1>
				<li>
					<Link to="/">Home</Link>
				</li>

				<li>
					<Link to="/login">Login</Link>
				</li>

				<li>
					<Link to="/signup">Signup</Link>
				</li>

				<li>
					<Link to="/myrecipes">My Recipes</Link>
				</li>

				<li>
					<Link to="/currentlist">Current List</Link>
				</li>
				<li>
					<Link to="/profile">Profile</Link>
				</li>
				<li>
					<button onClick={Auth.logout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
}
