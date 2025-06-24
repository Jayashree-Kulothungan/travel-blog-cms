export default function Loading() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <p className="text-gray-500">Loading post...</p>
      <div className="w-full h-64 bg-gray-200 animate-pulse mb-4 rounded" />
      <div className="space-y-2">
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />
        <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
        <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded" />
      </div>
    </main>
  );
}
