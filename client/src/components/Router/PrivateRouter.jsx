import { Navigate, Outlet } from 'react-router-dom';
import Auth from '../../utils/auth';

export default function PrivateRouter() {
	const loggedIn = Auth.loggedIn();
	return <>{loggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
}
