import Image from "next/image";
import { ExploreMenuOnHomeProps, MenuData } from "@/types/menu";
import Link from "next/link";



function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function ExploreMenuOnHome({ menus }: ExploreMenuOnHomeProps) {
  const visibleMenus = [...menus]
    .filter((menu) => menu._id && menu.titleEnglish)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (!visibleMenus.length) return null;

  return (
    <section className="bg-[#f5ede0] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            <span className="text-[#1a1a1a]">EXPLORE </span>
            <span className="text-[#2d6e5e]">MENU</span>
          </h2>
          <p className="mt-2 text-sm tracking-wide text-[#2d6e5e]">
            Explore the taste of Alkhafeef
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {visibleMenus.map((menu) => {
            const menuImageSrc = menu.menuImageUrl?.trim()||"/images/alkhafeef_logo.png";

            return (
            <Link key={menu._id} href={`/explore-menu/${menu._id}`}>
              <article
                key={menu._id}
                className="group relative flex h-52 flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 text-left text-[#1a1a1a] shadow-xl transition duration-200 hover:-translate-y-1 hover:bg-[#e05c2a] hover:text-white md:h-56 cursor-pointer"
              >
                <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-[#333] shadow-sm transition group-hover:border-[#c94d1e] group-hover:bg-[#c94d1e] group-hover:text-white">
                  <ArrowIcon />
                </div>

                <div className="relative z-10 pr-9">
                  <h3 className="text-lg font-bold leading-tight">
                    {menu.titleEnglish}
                  </h3>
                  {menu.itemCount > 0 && (
                    <p className="mt-1 text-xs font-medium text-[#2d6e5e]/80 transition group-hover:text-white/80">
                      {menu.itemCount} items
                    </p>
                  )}
                </div>

                {menuImageSrc ? (
                  <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none">
                    <Image
                      src={menuImageSrc}
                      alt={menu.titleEnglish}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : null}
              </article>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
