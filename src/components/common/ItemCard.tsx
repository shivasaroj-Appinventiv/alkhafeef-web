import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import ItemCardMedia from "./ItemCardMedia";
import NewArrivalStamp from "./NewArrivalStamp";
import { Flame } from "lucide-react";
import { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  lang?: "en" | "ar";
}

export default function ItemCard({ item, lang = "en" }: Props) {
  const itemName = lang === "ar" ? item.nameArabic : item.nameEnglish;
  const stampLabel =
    lang === "ar" ? item.stampNameAr : item.stampName;

  return (
    <article
      className={`
        group overflow-hidden
        rounded-3xl
        bg-white
        border border-[#efe8dc]
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${!item.isAvailable ? "opacity-75" : ""}
      `}
    >
      <div className="relative p-3">
        <Link
          href={`/items/${item._id}?menuId=${item.menuId}`}
          className="relative block h-[200px] rounded-2xl bg-[#f7f2ea]"
        >
          <ItemCardMedia item={item} />

          {item.isApplicable && stampLabel ? (
            <NewArrivalStamp
              label={stampLabel}
              color={item.stampColorCode}
            />
          ) : null}
        </Link>

        <FavoriteButton item={item} />
      </div>

      <div className="px-4 pb-4">
        <Link href={`/items/${item._id}?menuId=${item.menuId}`}>
          <h3 className="line-clamp-2 text-small font-bold text-[#42695a]">
            {itemName}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <Flame size={16} className="text-orange-500" />
          <span>{item.calories ?? 0} kcal</span>
        </div>

        <div className="mt-1 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-small font-extrabold text-[#42695a]">
              SR {item.price}
            </h4>
          </div>

          <div className="flex flex-col items-end gap-1">
            <AddToCartButton item={item} />
            {item.isCustomised && item.isAvailable ? (
              <Link
                href={`/items/${item._id}?menuId=${item.menuId}`}
                className="text-[10px] font-medium uppercase tracking-wide text-gray-500 hover:text-[#F26A21]"
              >
                Customize
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
