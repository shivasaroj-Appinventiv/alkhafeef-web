import CategoryItems from "../components/CategoryItems";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { categoryId } = await params;
  const { page: pageParam, limit: limitParam } = await searchParams;
  const pageNo = Math.max(1, Number(pageParam) || 1);
  const limit = Math.max(1, Number(limitParam) || 12);

  return (
    <CategoryItems categoryId={categoryId} pageNo={pageNo} limit={limit} />
  );
}
