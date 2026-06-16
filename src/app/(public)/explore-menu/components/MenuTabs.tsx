"use client";
import { ExploreMenuOnHomeProps } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default  function MenuTabs({ menus }: ExploreMenuOnHomeProps) {
  const activeCategoryId = useSelectedLayoutSegment();

  return (
    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#eeccbc] scrollbar-track-[#eeccbc]-100">
      <div className="flex min-w-max gap-3 pb-2">
        {menus.map((menu) => {
          const active = menu._id === activeCategoryId;

          return (
            <Link
              key={menu._id}
              href={`/explore-menu/${menu._id}`}
              className={`
                flex h-14 min-w-[150px] items-center gap-3 rounded-xl border px-3 transition
                ${
                  active
                    ? "bg-[#f26a21] text-white border-[#f26a21]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"
                }
              `}
            >
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={menu.menuImageUrl}
                  alt={menu.titleEnglish}
                  sizes="40px"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="truncate text-sm font-medium">
                {menu.titleEnglish}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
