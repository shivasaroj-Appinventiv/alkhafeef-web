export default function MenuTabsSkeleton() {
  return (
    <section className="sticky top-0 z-20 mb-8">
      <div className="flex min-w-max gap-3 pb-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex h-14 min-w-[150px] animate-pulse items-center gap-3 rounded-xl border border-gray-200 bg-white px-3"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-[#efe8dc]" />
            <div className="h-3 w-20 rounded bg-[#efe8dc]" />
          </div>
        ))}
      </div>
    </section>
  );
}
