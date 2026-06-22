export default function StoreListSkeleton() {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto pr-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full rounded-xl border border-[#e7dfd2] bg-white p-3"
        >
          <div className="flex gap-3">
            <div className="h-20 w-28 shrink-0 animate-pulse rounded-lg bg-[#efe8dc]" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-4/5 animate-pulse rounded bg-[#efe8dc]" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-[#efe8dc]" />
              <div className="h-3 w-full animate-pulse rounded bg-[#efe8dc]" />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((__, chipIndex) => (
              <div
                key={chipIndex}
                className="h-6 w-16 animate-pulse rounded-md bg-[#efe8dc]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
