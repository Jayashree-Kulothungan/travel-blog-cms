'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-sand)' }}
    >
      <div className="text-center max-w-md px-6">
        <p
          className="font-display text-7xl font-black italic mb-4"
          style={{ color: 'var(--color-rust)' }}
        >
          Oops.
        </p>
        <h2 className="text-xl font-sans font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-8 font-sans" style={{ color: 'var(--color-muted)' }}>
          {error.message}
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={reset}
            className="text-sm font-sans tracking-widest uppercase underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-rust)' }}
          >
            Try again
          </button>
          <Link
            href="/home"
            className="text-sm font-sans tracking-widest uppercase underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
          >
            ← All Stories
          </Link>
        </div>
      </div>
    </main>
  );
}
