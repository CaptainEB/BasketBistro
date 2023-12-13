import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Nav.scss';
import logo from '/logo.png?url';

export default function Nav() {
	return (
		<nav>
			<ul className="nav-ul">
				<li className="logo">
					<Link to="/">
						<img src={logo} alt="Basket Bistro logo" width={100} height={100} />
					</Link>
				</li>
				{Auth.loggedIn() ? (
					<>
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
							<button className="btn" onClick={Auth.logout}>
								Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>

						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
