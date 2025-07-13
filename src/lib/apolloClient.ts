// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint) {
  console.warn(
    '❌ Missing GraphQL endpoint. Please set NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT in your environment variables.'
  );
}

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined', // Enables SSR-friendly behavior
  link: new HttpLink({
    uri: graphqlEndpoint,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
