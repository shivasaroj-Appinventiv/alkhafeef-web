import { Suspense } from "react";
import { fetchMenList } from "@/lib/menuListFetcher";
import ExploreMenuHeader from "./components/ExploreMenuHeader";
import MenuTabsSkeleton from "@/components/common/skeletons/MenuTabsSkeleton";

async function ExploreMenuHeaderSection() {
  const menus = await fetchMenList();
  return <ExploreMenuHeader menus={menus} />;
}

export default function ExploreMenuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Suspense fallback={<MenuTabsSkeleton />}>
        <ExploreMenuHeaderSection />
      </Suspense>
      {children}
    </div>
  );
}
