import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { Outlet } from 'react-router-dom';