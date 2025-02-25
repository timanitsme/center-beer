import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import BarMenu from "../../components/BarMenu/BarMenu.jsx";
import BarsCatalog from "../../components/Catalogs/BarsCatalog.jsx";
import {getBeerPageFilterButtons, getBeerPageFilters} from "./BeerPageData.jsx";
import BeerCatalog from "../../components/Catalogs/BeerCatalog.jsx";

export default function BeerPage(){
    const paths = [
        {title:"beer.center", path: "/"},
        {title:"Пиво", path: "/beer/"},
    ]

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <BeerCatalog filterButtons={getBeerPageFilterButtons()} filters={getBeerPageFilters()}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}