import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint) {
  throw new Error('❌ GraphQL endpoint is missing.');
}

// Strip credentials from URL and pass them as a header instead
const url = new URL(graphqlEndpoint);
const credentials = url.username && url.password
  ? btoa(`${url.username}:${url.password}`)
  : null;
url.username = '';
url.password = '';

const client = new ApolloClient({
  link: new HttpLink({
    uri: url.toString(),
    headers: {
      ...(credentials && { Authorization: `Basic ${credentials}` }),
    },
  }),
  cache: new InMemoryCache(),
});

export default client;