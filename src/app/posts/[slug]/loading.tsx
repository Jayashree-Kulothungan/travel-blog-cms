export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-sand)' }}>
      {/* Hero skeleton */}
      <div className="w-full h-72 md:h-96 bg-stone-300 animate-pulse" />

      {/* Card skeleton */}
      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
          <div className="flex gap-3">
            <div className="h-7 w-28 bg-stone-200 animate-pulse rounded-full" />
            <div className="h-7 w-20 bg-stone-200 animate-pulse rounded-full" />
          </div>
          <div className="h-12 w-3/4 bg-stone-200 animate-pulse rounded" />
          <div className="h-6 w-full bg-stone-200 animate-pulse rounded" />
          <div className="h-6 w-5/6 bg-stone-200 animate-pulse rounded" />
          <hr className="border-stone-100" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-4 bg-stone-200 animate-pulse rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
