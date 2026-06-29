import Image from "next/image";
import Link from "next/link";

interface ProfileEmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function ProfileEmptyState({
  imageSrc,
  imageAlt,
  imageWidth = 177,
  imageHeight = 175,
  title,
  description,
  actionLabel = "Explore Menu",
  actionHref = "/explore-menu",
}: ProfileEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:py-14">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="h-auto w-[140px] sm:w-[177px]"
      />

      <h2 className="mt-8 text-lg font-bold text-[#113d2d] sm:text-xl">{title}</h2>

      <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
        {description}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-8 inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#f26a21] px-10 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e05f1c]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
