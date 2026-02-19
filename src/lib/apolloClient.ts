import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint) {
  throw new Error('❌ GraphQL endpoint is missing. Set NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT in .env.local');
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlEndpoint,
  }),
  cache: new InMemoryCache(),
});

export default client;