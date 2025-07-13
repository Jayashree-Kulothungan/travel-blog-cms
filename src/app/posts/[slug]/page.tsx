// src/app/posts/[slug]/page.tsx
import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import { GetPostBySlugQuery } from '@/generated/graphql';
import { Metadata } from 'next';
import Image from 'next/image';

// ✅ Revalidate page every 60 seconds (safe for ISR and static generation)
export const revalidate = 60;

// ✅ GraphQL query
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      postMetadata {
        location
        tripRating
        mapLink
      }
    }
  }
`;

// ✅ Generate all possible slugs for static rendering
export async function generateStaticParams() {
  const res = await client.query({
    query: gql`
      query GetAllSlugs {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return res.data.posts.nodes.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// ✅ Metadata with type-safe params and error handling
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const { slug } = params;

    const { data } = await client.query<GetPostBySlugQuery>({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    const post = data?.post;
    const title = post?.title ?? 'Travel Blog';
    const description = post?.excerpt?.replace(/<[^>]+>/g, '') ?? '';
    const image = post?.featuredImage?.node?.sourceUrl ?? '';

    return {
      title: `${title} | Travel Blog`,
      description,
      openGraph: {
        title,
        description,
        images: image ? [image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Travel Blog | Error',
      description: 'Unable to load post metadata.',
    };
  }
}

// ✅ Main post page with typing and graceful error fallback
export default async function PostPage(
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  let post;
  try {
    const { data } = await client.query<GetPostBySlugQuery>({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    post = data?.post;
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 mt-10">
        Post not found or failed to load.
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-md mt-10 rounded-lg">
      <a href="/" className="text-blue-600 hover:underline text-sm mb-4 block">
        ← Back to Home
      </a>

      {post.featuredImage?.node?.sourceUrl && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.title ?? 'Blog Featured Image'}
          className="w-full h-64 object-cover rounded mb-6"
          width={800}
          height={400}
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.postMetadata?.location && (
        <p className="text-gray-700 mb-2">
          <strong>📍 Location:</strong> {post.postMetadata.location}
        </p>
      )}

      {post.postMetadata?.tripRating && (
        <p className="text-gray-700 mb-2">
          <strong>⭐ Trip Rating:</strong> {post.postMetadata.tripRating}
        </p>
      )}

      {post.postMetadata?.mapLink && (
        <p className="mb-4">
          <a
            href={post.postMetadata.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Map
          </a>
        </p>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />
    </main>
  );
}
