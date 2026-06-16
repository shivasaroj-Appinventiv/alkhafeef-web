import { fetchMenList } from "@/lib/menuListFetcher";
import { redirect } from "next/navigation";

export default async function exploreMenu(){
    const menus = await fetchMenList();

  if (!menus.length) {
    return null;
  }

  redirect(`/explore-menu/${menus[0]._id}`);
}