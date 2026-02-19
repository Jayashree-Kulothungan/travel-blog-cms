import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AosInit from '@/components/AosInit';
import { GetAllPostsQuery } from '@/generated/graphql';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore real travel stories, cultural tips, and beautiful destinations.',
};

// ISR: revalidate every 60 seconds
export const revalidate = 60;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 10) {
      nodes {
        slug
        title
        excerpt
        postMetadata {
          location
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default async function HomePage() {
let posts: NonNullable<GetAllPostsQuery['posts']>['nodes'] = [];
  try {
    const { data } = await client.query<GetAllPostsQuery>({
      query: GET_ALL_POSTS,
    });
    posts = data?.posts?.nodes ?? [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    <>
      <AosInit />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-sand)' }}>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/julian-tong.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          <div className="relative z-10 px-8 pb-16 max-w-4xl">
            <p
              className="text-xs uppercase tracking-[0.4em] text-amber-300 mb-4 font-sans drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              Travel Stories & Cultural Dispatches
            </p>
            <h1
              className="font-display text-6xl md:text-8xl font-black italic text-white leading-none"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Wanderlust
              <br />
              <span style={{ color: 'var(--color-gold)' }}>Chronicles</span>
            </h1>
            <p
              className="mt-6 text-white text-lg max-w-xl font-sans drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Raw, honest travel writing from the road. No filters, no sponsored stays.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-display text-4xl font-bold" style={{ color: 'var(--color-ink)' }}>
              Latest Adventures
            </h2>
            <span className="text-sm font-sans tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
              {posts.length} stories
            </span>
          </div>

          {posts.length === 0 ? (
            <p className="text-center py-20 font-sans" style={{ color: 'var(--color-muted)' }}>
              No posts found. Check your WordPress connection.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                const imageUrl = post.featuredImage?.node?.sourceUrl;
                const excerpt = post.excerpt?.replace(/<[^>]+>/g, '').slice(0, 100);
                return (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group block"
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                  >
                    <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title ?? ''}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-sand)' }}>
                            <span className="text-4xl opacity-30">✈️</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {post.postMetadata?.location && (
                          <p className="text-xs font-sans tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold)' }}>
                            📍 {post.postMetadata.location}
                          </p>
                        )}
                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-amber-700 transition-colors" style={{ color: 'var(--color-ink)' }}>
                          {post.title}
                        </h3>
                        {excerpt && (
                          <p className="text-sm font-sans leading-relaxed line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                            {excerpt}…
                          </p>
                        )}
                        <span className="inline-block mt-4 text-xs font-sans tracking-widest uppercase border-b pb-0.5 transition-colors" style={{ color: 'var(--color-rust)', borderColor: 'var(--color-rust)' }}>
                          Read story →
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
