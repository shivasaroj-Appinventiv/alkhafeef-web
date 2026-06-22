export default function StoreMapSkeleton() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-[#efe8dc]">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#efe8dc] via-[#f7f2ea] to-[#efe8dc]" />
      <div className="absolute left-4 top-4 h-8 w-24 animate-pulse rounded-lg bg-white/70" />
      <div className="absolute right-4 top-4 h-8 w-8 animate-pulse rounded bg-white/70" />
      <div className="absolute bottom-4 right-4 space-y-2">
        <div className="h-8 w-8 animate-pulse rounded bg-white/70" />
        <div className="h-8 w-8 animate-pulse rounded bg-white/70" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-10 w-8 -translate-x-1/2 -translate-y-full animate-pulse rounded-full bg-[#f26a21]/40" />
    </div>
  );
}
