import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint) {
  throw new Error('❌ GraphQL endpoint is missing.');
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlEndpoint,
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;