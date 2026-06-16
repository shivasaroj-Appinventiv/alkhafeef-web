export default function ItemGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-[#efe8dc] bg-white shadow-sm"
        >
          <div className="p-3">
            <div className="h-[200px] animate-pulse rounded-2xl bg-[#f7f2ea]" />
          </div>
          <div className="space-y-3 px-4 pb-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-[#efe8dc]" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-[#efe8dc]" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-[#efe8dc]" />
          </div>
        </div>
      ))}
    </div>
  );
}
