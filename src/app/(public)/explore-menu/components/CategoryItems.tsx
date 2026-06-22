import { auth } from "@/auth";
import ItemCard from "@/components/common/ItemCard";
import { getFavoriteItemsList, getMenuItemList } from "@/lib/menuListFetcher";
import { MenuItem } from "@/types/menu";

interface Props {
  categoryId: string;
  pageNo?: number;
  limit?: number;
}

export default async function CategoryItems({
  categoryId,
  pageNo = 1,
  limit = 12,
}: Props) {
  let items: MenuItem[] = [];

  if (categoryId === "favorite-items") {
    const session = await auth();
    items = await getFavoriteItemsList(pageNo, limit, session?.accessToken);
    console.log(items,'favorite items');
    
  } else {
    items = await getMenuItemList(categoryId);    
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4 wid">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
