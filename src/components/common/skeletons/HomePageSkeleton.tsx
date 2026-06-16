export default function HomePageSkeleton() {
  return (
    <div className="space-y-8">
      <div
        className="w-full animate-pulse rounded-2xl bg-[#e8c9b0]"
        style={{ aspectRatio: "16/6.5" }}
      />

      <section className="bg-[#f5ede0] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="h-10 w-64 animate-pulse rounded bg-[#efe8dc]" />
            <div className="h-4 w-48 animate-pulse rounded bg-[#efe8dc]" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-2xl bg-white md:h-56"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
