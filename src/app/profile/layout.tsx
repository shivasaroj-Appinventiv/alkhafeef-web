import { auth } from "@/auth";
import Sidebar from "@/components/common/Sidebar";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // console.log(session);
  if (!session?.user) {
    redirect("/?login=1&callbackUrl=/profile/orders");
  }
  return (
    <section className="bg-[#f5ede0] py-10">
      <div className="mx-auto flex max-w-6xl items-start gap-5 px-4">
        {/* ✅ self-start prevents sidebar from stretching full height */}
        <div className="sticky top-6 self-start flex-shrink-0">
          <Sidebar user={session.user} />
        </div>

        <main className="flex-1 p-4 min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm h-full min-h-[calc(55vh)]">
          {children}
        </main>
      </div>
    </section>
  );
}
