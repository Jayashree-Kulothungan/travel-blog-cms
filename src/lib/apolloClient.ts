import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: 'http://travel-blog-cms.local/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;

