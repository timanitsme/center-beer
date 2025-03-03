import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {getBeerMapPageFilterButtons, getBeerMapPageFilters, getBeerMapPagePaths} from "./BeerMapPageData.jsx";
import BeerMapCatalog from "../../components/Catalogs/BeerMapCatalog.jsx";

export default function BeerMapPage(){
    return(
        <div className="content">
            <NavChain paths={getBeerMapPagePaths()}/>
            <BeerMapCatalog filters={getBeerMapPageFilters()} filterButtons={getBeerMapPageFilterButtons()}/>
        </div>
    )
}