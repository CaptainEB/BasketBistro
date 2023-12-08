import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.scss';
import Footer from './components/Footer';
import Nav from './components/Nav';
import PageRoutes from './components/Router';

const httpLink = createHttpLink({
	uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  },
	};
  });
  
  const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
  });

export default function App() {
	return (
		<ApolloProvider client={client}>
			<header>
				<Nav />
			</header>
			<main>
				<PageRoutes />
			</main>
			<Footer />
		</ApolloProvider>
	);
}
