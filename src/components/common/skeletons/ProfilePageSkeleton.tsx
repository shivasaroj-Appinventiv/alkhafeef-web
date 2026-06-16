export default function ProfilePageSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-8 w-40 rounded bg-gray-200" />
      <div className="h-4 w-64 rounded bg-gray-100" />
      <div className="mt-6 space-y-3">
        <div className="h-24 rounded-xl bg-gray-100" />
        <div className="h-24 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
