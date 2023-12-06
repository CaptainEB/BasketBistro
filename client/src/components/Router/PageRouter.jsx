import { Route, Routes } from 'react-router-dom';
import CurrentList from '/src/pages/CurrentList';
import Home from '/src/pages/Home';
import Login from '/src/pages/Login';
import MyRecipes from '/src/pages/MyRecipes';
import Profile from '/src/pages/Profile';
import Signup from '/src/pages/Signup';

export default function PageRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/currentlist" element={<CurrentList />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/myrecipes" element={<MyRecipes />} />
		</Routes>
	);
}
