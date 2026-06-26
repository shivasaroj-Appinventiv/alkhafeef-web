"use client";
import { ExploreMenuOnHomeProps } from "@/types/menu";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

function scrollTabToCenter(container: HTMLDivElement, tab: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const scrollLeft =
    container.scrollLeft +
    (tabRect.left - containerRect.left) -
    container.clientWidth / 2 +
    tabRect.width / 2;
  const maxScroll = container.scrollWidth - container.clientWidth;

  container.scrollTo({
    left: Math.min(Math.max(0, scrollLeft), maxScroll),
    behavior: "smooth",
  });
}

export default function MenuTabs({ menus }: ExploreMenuOnHomeProps) {
  const { categoryId: activeCategoryId } = useParams<{ categoryId?: string }>();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isFavoriteItemsPage = activeCategoryId === "favorite-items";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !activeCategoryId) return;

    const scrollActiveTab = () => {
      const activeTab = container.querySelector<HTMLElement>(
        `[data-tab-id="${activeCategoryId}"]`,
      );
      if (activeTab) {
        scrollTabToCenter(container, activeTab);
      }
    };

    scrollActiveTab();
    const rafId = requestAnimationFrame(scrollActiveTab);

    const inner = container.firstElementChild;
    const resizeObserver = inner
      ? new ResizeObserver(scrollActiveTab)
      : null;
    if (resizeObserver && inner) {
      resizeObserver.observe(inner);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
    };
  }, [activeCategoryId, isLoggedIn, status, menus.length]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#eeccbc] scrollbar-track-[#eeccbc]-100"
    >
      <div className="flex min-w-max gap-3 pb-2">
        {menus.map((menu) => {
          const active = menu._id === activeCategoryId;
          const menuImageSrc = menu.menuImageUrl?.trim()||"/images/alkhafeef_logo.png";

          return (
            <Link
              key={menu._id}
              data-tab-id={menu._id}
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
              {menuImageSrc ? (
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={menuImageSrc}
                    alt={menu.titleEnglish}
                    sizes="40px"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : null}

              <span className="truncate text-sm font-medium">
                {menu.titleEnglish}
              </span>
            </Link>
          );
        })}

        {isLoggedIn && (
          <Link
            data-tab-id="favorite-items"
            href="/explore-menu/favorite-items"
            className={`
                flex h-14 min-w-[150px] items-center gap-3 rounded-xl border px-3 transition
                ${
                  isFavoriteItemsPage
                    ? "bg-[#f26a21] text-white border-[#f26a21]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"
                }
              `}
          >
            <Heart
              size={30}
              className={!isFavoriteItemsPage ? "fill-[#F26A21] text-[#F26A21]" : "fill-white text-white-300"}
              aria-hidden="true"
            />
            <span className="truncate text-sm font-medium">My Favorites</span>
          </Link>
        )}
      </div>
    </div>
  );
}
