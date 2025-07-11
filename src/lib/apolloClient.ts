import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: process.env.WPGRAPHQL_URL ?? '',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;

