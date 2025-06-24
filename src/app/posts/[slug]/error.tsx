'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <main className="max-w-3xl mx-auto p-8 text-red-600">
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
    </main>
  );
}
