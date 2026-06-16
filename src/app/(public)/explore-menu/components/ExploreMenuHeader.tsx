import { ExploreMenuOnHomeProps } from "@/types/menu";
import MenuTabs from "./MenuTabs";

export default function ExploreMenuHeader({menus}:ExploreMenuOnHomeProps){
    return(
    <section className="sticky top-0 z-20 mb-8">
        <MenuTabs menus={menus} />
    </section>
)
} 