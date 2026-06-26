import { auth } from "@/auth";
import ItemDetailView from "@/components/items/ItemDetailView";
import { getMenuItemDetail } from "@/lib/menuListFetcher";
import { notFound } from "next/navigation";

export default async function ItemDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ itemId: string }>;
  searchParams: Promise<{ menuId?: string }>;
}) {
  const { itemId } = await params;
  const { menuId } = await searchParams;
  const session = await auth();

  const item = await getMenuItemDetail(itemId, {
    menuId,
    accessToken: session?.accessToken,
  });
  if (!item) {
    notFound();
  }

  return <ItemDetailView item={item} />;
}
