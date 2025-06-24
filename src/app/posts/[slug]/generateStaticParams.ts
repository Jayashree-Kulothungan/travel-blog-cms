import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';

const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts {
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  const { data } = await client.query({ query: GET_ALL_POST_SLUGS });

  return data.posts.nodes.map((post: any) => ({
    slug: post.slug,
  }));
}
