import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.scss';
import Footer from './components/Footer';
import Nav from './components/Nav';
import PageRoutes from './components/Router';

export default function App() {
	return (
		<>
			<header>
				<Nav />
			</header>
			<main>
				<PageRoutes />
			</main>
			<Footer />
		</>
	);
}
