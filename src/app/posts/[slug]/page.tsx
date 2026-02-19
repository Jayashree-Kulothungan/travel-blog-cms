import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import { GetPostBySlugQuery } from '@/generated/graphql';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

// ISR: revalidate every 60 seconds
export const revalidate = 60;

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

// Use React cache to deduplicate the identical query call between
// generateMetadata and the page component within the same render.
const getPost = cache(async (slug: string) => {
  const { data } = await client.query<GetPostBySlugQuery>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  return data?.post ?? null;
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate all slugs for static rendering at build time
export async function generateStaticParams() {
  try {
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
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// SEO metadata — shares cached fetch with the page component
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Post Not Found' };

    const title = post.title ?? 'Travel Blog';
    const description = post.excerpt?.replace(/<[^>]+>/g, '') ?? '';
    const image = post.featuredImage?.node?.sourceUrl ?? '';

    return {
      title,
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
    return { title: 'Travel Blog | Error' };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;
  try {
    post = await getPost(slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-sand)' }}>
        <div className="text-center">
          <p className="font-display text-6xl font-black italic mb-4" style={{ color: 'var(--color-rust)' }}>
            404
          </p>
          <p className="text-lg mb-6 font-sans" style={{ color: 'var(--color-muted)' }}>
            Post not found or failed to load.
          </p>
          <Link href="/home" className="underline font-sans text-sm tracking-widest uppercase" style={{ color: 'var(--color-rust)' }}>
            ← Back to all stories
          </Link>
        </div>
      </main>
    );
  }

  const plainExcerpt = post.excerpt?.replace(/<[^>]+>/g, '') ?? '';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-sand)' }}>

      {/* Hero image or colored header */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {post.featuredImage?.node?.sourceUrl ? (
          <>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title ?? 'Featured image'}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--color-ink)' }} />
        )}

        {/* Back link overlaid on hero */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-sans tracking-widest uppercase transition-colors"
          >
            ← All Stories
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">

          {/* Location + rating */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm font-sans">
            {post.postMetadata?.location && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs tracking-widest uppercase font-medium" style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-gold)' }}>
                📍 {post.postMetadata.location}
              </span>
            )}
            {post.postMetadata?.tripRating && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs tracking-widest uppercase font-medium" style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-muted)' }}>
                ⭐ {post.postMetadata.tripRating}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-black italic leading-tight mb-4" style={{ color: 'var(--color-ink)' }}>
            {post.title}
          </h1>

          {plainExcerpt && (
            <p className="text-lg mb-8 leading-relaxed font-sans" style={{ color: 'var(--color-muted)' }}>
              {plainExcerpt}
            </p>
          )}

          {post.postMetadata?.mapLink && (
            <a
              href={post.postMetadata.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-8 text-sm font-sans tracking-widest uppercase underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-rust)' }}
            >
              🗺 View on Map
            </a>
          )}

          <hr className="my-8 border-stone-200" />

          {/* Post body from WordPress */}
          <div
            className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:italic prose-a:text-amber-700"
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </div>
      </main>
    </div>
  );
}
