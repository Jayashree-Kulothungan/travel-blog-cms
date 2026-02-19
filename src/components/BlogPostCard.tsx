import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string;
  slug: string;
  location?: string;
  excerpt?: string;
  image?: string;
};

export default function BlogPostCard({ title, slug, location, excerpt, image }: Props) {
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50">
              <span className="text-4xl opacity-30">✈️</span>
            </div>
          )}
        </div>
        <div className="p-6">
          {location && (
            <p className="text-xs font-sans tracking-widest uppercase mb-2 text-amber-600">
              📍 {location}
            </p>
          )}
          <h3 className="font-display text-xl font-bold mb-2 group-hover:text-amber-700 transition-colors text-stone-900">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm font-sans leading-relaxed line-clamp-2 text-stone-500">
              {excerpt}…
            </p>
          )}
          <span className="inline-block mt-4 text-xs font-sans tracking-widest uppercase border-b pb-0.5 text-red-700 border-red-700">
            Read story →
          </span>
        </div>
      </article>
    </Link>
  );
}
