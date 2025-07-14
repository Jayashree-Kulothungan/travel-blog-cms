const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT || '';

if (!graphqlEndpoint) {
  throw new Error('❌ GraphQL endpoint is missing. Set NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT.');
}
