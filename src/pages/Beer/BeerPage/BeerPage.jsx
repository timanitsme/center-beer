import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import {getBeerPageFilterButtons, getBeerPageFilters, getBeerPagePaths} from "./BeerPageData.jsx";
import BeerCatalog from "../../../components/Catalogs/BeerCatalog.jsx";

export default function BeerPage(){
    return(
        <div className="content">
            <NavChain paths={getBeerPagePaths()}/>
            <BeerCatalog filterButtons={getBeerPageFilterButtons()} filters={getBeerPageFilters()}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}