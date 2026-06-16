import ItemCard from "@/components/common/ItemCard";
import { getMenuItemList } from "@/lib/menuListFetcher";

interface Props {
  categoryId: string;
}
export default async function CategoryItems({ categoryId }: Props) {
  const items = await getMenuItemList(categoryId);
  console.log(items, categoryId, "******************88");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4 wid">
      {items.map((item: any) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
