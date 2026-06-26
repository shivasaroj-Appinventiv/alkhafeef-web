import Link from "next/link";

export default function ItemNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-[#42695a]">Item not found</h1>
      <p className="mt-2 text-sm text-gray-600">
        The item you are looking for may have been removed or is unavailable.
      </p>
      <Link
        href="/explore-menu"
        className="mt-6 rounded-full bg-[#F26A21] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e65f17]"
      >
        Browse menu
      </Link>
    </div>
  );
}
