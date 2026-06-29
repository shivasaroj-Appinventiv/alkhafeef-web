export default function ProfileListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-gray-100 bg-gray-50 p-4"
        >
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="mt-3 h-3 w-2/3 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
