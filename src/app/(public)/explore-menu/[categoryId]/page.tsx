import ItemCard from "@/components/common/ItemCard";
import CategoryItems from "../components/CategoryItems";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  return (
    <>
      <CategoryItems categoryId={categoryId} />
    </>
  );
}
