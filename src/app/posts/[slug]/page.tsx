import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import { GetPostBySlugQuery } from '@/generated/graphql';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

type PageProps = {
  params: {
    slug: string;
  };
};

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

export default async function PostPage({ params }: PageProps) {
  const slug = params.slug;

  const { data } = await client.query<GetPostBySlugQuery>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  const post = data?.post;

  const title = post?.title ?? 'Untitled Post';
  const image = post?.featuredImage?.node?.sourceUrl ?? '';
  const content = post?.content ?? '';
  const location = post?.postMetadata?.location;
  const rating = post?.postMetadata?.tripRating;
  const mapLink = post?.postMetadata?.mapLink;

  return (
    <main className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-md mt-10 rounded-lg">
      <a href="/" className="text-blue-600 hover:underline text-sm mb-4 block">← Back to Home</a>
      
      {image && (
        <Image
          src={image}
          alt={title}
          width={1200}
          height={400}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {location && <p className="text-gray-700 mb-2"><strong>📍 Location:</strong> {location}</p>}
      {rating && <p className="text-gray-700 mb-2"><strong>⭐ Trip Rating:</strong> {rating}</p>}
      {mapLink && (
        <p className="mb-4">
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View on Map
          </a>
        </p>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}

export async function generateMetadata(
  { params }: PageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
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
}
