import { auth } from "@/auth";
import ItemCard from "@/components/common/ItemCard";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import { getFavoriteItemsList } from "@/lib/menuListFetcher";

export default async function FavoritesPage() {
  const session = await auth();
  let items: Awaited<ReturnType<typeof getFavoriteItemsList>> = [];
  let error: string | null = null;

  try {
    items = await getFavoriteItemsList(1, 12, session?.accessToken);
  } catch (err) {
    console.error(err);
    error = "Unable to load favorites. Please try again.";
  }

  return (
    <ProfilePageShell
      title="Favorites"
      description="You can choose to manage and update your favorite items as per your preferences in Al Khafeef."
    >
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <ProfileEmptyState
          imageSrc="/svg/favourite-not-found.svg"
          imageAlt="No favorites found"
          title="No favorites added yet."
          description="Seems like you have not added any items to your favorites in AlKhafeef yet."
          actionLabel="Explore Menu"
          actionHref="/explore-menu"
        />
      )}
    </ProfilePageShell>
  );
}
