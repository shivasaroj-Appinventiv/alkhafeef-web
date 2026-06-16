import { fetchMenList } from "@/lib/menuListFetcher";
import ExploreMenuHeader from "./components/ExploreMenuHeader";

export default async function ExploreMenuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const menus =await fetchMenList();
  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <ExploreMenuHeader menus={menus} />
      {children}
    </div>
  );
}
