import Link from 'next/link';
import Image from 'next/image'

type Props = {
  title: string;
  slug: string;
  image?: string;
};

export default function BlogPostCard({ title, slug, image }: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="rounded shadow p-4 bg-white cursor-pointer hover:shadow-lg transition">
        {image && <Image src={image} alt={title} className="mb-2 rounded" />}
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-blue-600">/{slug}</p>
      </div>
    </Link>
  );
}
