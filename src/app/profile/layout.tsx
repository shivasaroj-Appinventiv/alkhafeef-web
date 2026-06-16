import Sidebar from "@/components/common/Sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#f5ede0] py-10">
      <div className="mx-auto flex max-w-6xl items-start gap-5 px-4">

        {/* ✅ self-start prevents sidebar from stretching full height */}
        <div className="sticky top-6 self-start flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm">
          {children}
        </main>

      </div>
    </section>
  );
}