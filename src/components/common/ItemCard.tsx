import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import { Flame } from "lucide-react";
import { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
}

export default function ItemCard({ item }: Props) {
  return (
    <article
      className="
        group overflow-hidden
        rounded-3xl
        bg-white
        border border-[#efe8dc]
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image Section */}
      <div className="relative p-3">
        <div className="relative h-[200px] rounded-2xl bg-[#f7f2ea]">
          <Image
            src={item.itemImageUrl}
            alt={item.nameEnglish}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            className="
              object-contain
              p-4
              transition-transform duration-300
              group-hover:scale-105
            "
          />

          <FavoriteButton />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h3
          className="
            line-clamp-2
            text-small
            font-bold
            text-[#42695a]
          "
        >
          {item.nameEnglish}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <Flame size={16} className="text-orange-500" />
          <span>{item.calories ?? 0} kcal</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div>
            <h4
              className="
                text-small
                font-extrabold
                text-[#42695a]
              "
            >
              SR {item.price}
            </h4>
          </div>

          <AddToCartButton />
        </div>

        {item.isCustomised && (
          <div className="text-end mr-8">
            <span
              className="
             text-align-right
              py-2
              text-[10px]
              font-sm
              text-gray-500
            "
            >
              Customize
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
