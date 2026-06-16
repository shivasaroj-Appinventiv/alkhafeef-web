import { Suspense } from "react";
import ExploreMenuOnHome from "@/components/ExploreMenuOnHome";
import HomeCarousals from "@/components/HomeCarousals";
import { fetchBanners } from "@/lib/bannerFtecher";
import { fetchMenList } from "@/lib/menuListFetcher";

async function BannerSection() {
  const banners = await fetchBanners();
  return <HomeCarousals slides={banners} />;
}

async function MenuSection() {
  const menus = await fetchMenList();
  return <ExploreMenuOnHome menus={menus} />;
}

function BannerFallback() {
  return (
    <div
      className="w-full animate-pulse rounded-2xl bg-[#e8c9b0]"
      style={{ aspectRatio: "16/6.5" }}
    />
  );
}

function MenuFallback() {
  return (
    <section className="bg-[#f5ede0] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
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
  );
}

const Page = () => {
  return (
    <div className="space-y-8">
      <Suspense fallback={<BannerFallback />}>
        <BannerSection />
      </Suspense>

      <Suspense fallback={<MenuFallback />}>
        <MenuSection />
      </Suspense>
    </div>
  );
};

export default Page;
