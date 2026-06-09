import ExploreMenuOnHome from "@/components/ExploreMenuOnHome";
import HomeCarousals from "@/components/HomeCarousals";
import { fetchBanners } from "@/lib/bannerFtecher";
import { fetchMenList } from "@/lib/menuListFetcher";

const Page = async () => {
  const [banners, menus] = await Promise.all([fetchBanners(), fetchMenList()]);

  return (
    <div className="space-y-8">
      {/* Carousals Banners Section */}
      <HomeCarousals slides={banners} />

      {/* Explore Menus */}
      <ExploreMenuOnHome menus={menus} />
    </div>
  );
};

export default Page;
