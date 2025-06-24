'use client';

import { gql } from '@apollo/client';
import client from '../lib/apolloClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 10) {
      nodes {
        slug
        title
        postMetadata {
          location
        }
      }
    }
  }
`;

type Post = {
  slug: string;
  title: string;
  postMetadata?: {
    location?: string;
  };
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchPosts = async () => {
      const { data } = await client.query({ query: GET_ALL_POSTS });
      setPosts(data?.posts?.nodes || []);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* 🌄 Hero Section */}
      <section
        className="h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/julian-tong.jpg')" }}
        aria-label="Hero image of mountain landscape"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Wanderlust Chronicles</h1>
          <p className="mt-4 text-lg drop-shadow-sm max-w-2xl">
            Explore real travel stories, cultural tips, and beautiful destinations.
          </p>
        </div>
      </section>

      {/* ✨ Section Intro */}
      <header className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-2">Latest Adventures</h2>
        <p className="text-gray-600">Fresh stories from globetrotters around the world</p>
      </header>

      {/* 🧳 Blog Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                {post.postMetadata?.location && (
                  <p className="text-sm text-gray-600 mt-2">📍 {post.postMetadata.location}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
