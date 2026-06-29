import ProfileListSkeleton from "@/components/profile/ProfileListSkeleton";
import ProfilePageShell from "@/components/profile/ProfilePageShell";

export default function FavoritesLoading() {
  return (
    <ProfilePageShell
      title="Favorites"
      description="You can choose to manage and update your favorite items as per your preferences in Al Khafeef."
    >
      <ProfileListSkeleton />
    </ProfilePageShell>
  );
}
