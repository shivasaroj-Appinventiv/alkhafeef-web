import { Suspense } from "react";
import CategoryItems from "../components/CategoryItems";
import ItemGridSkeleton from "@/components/common/skeletons/ItemGridSkeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  return (
    <Suspense fallback={<ItemGridSkeleton />}>
      <CategoryItems categoryId={categoryId} />
    </Suspense>
  );
}
