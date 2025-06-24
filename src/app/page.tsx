import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const dynamicParams = true;

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' '),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
  });

  const post = data?.post;

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.featuredImage?.node?.sourceUrl && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-md mb-6"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose max-w-none" />
    </div>
  );
}
