"use client";

import Image from "next/image";
import type { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  className?: string;
}

export default function ItemCardMedia({ item, className = "" }: Props) {
  const isVideo = item.mediaType === "2";
  const imageSrc = isVideo
    ? item.thumbnailImage?.trim() || "/images/alkhafeef_logo.png"
    : item.itemImageUrl?.trim() || "/images/alkhafeef_logo.png";

  return (
    <div className={`relative h-full w-full ${className}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={item.nameEnglish}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      ) : null}

      {isVideo && item.itemImageUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={item.itemImageUrl}
          className="absolute inset-0 h-full w-full rounded-2xl object-cover"
        />
      ) : null}
    </div>
  );
}
