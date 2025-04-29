import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {getBreweryPageFilters, getBreweryPagePaths} from "./BreweryPageData.jsx";
import BreweryCatalog from "../../../components/Catalogs/BreweryCatalog.jsx";

export default function BreweryPage(){

    return(
        <div className="content">
            <NavChain paths={getBreweryPagePaths()}/>
            <BreweryCatalog filters={getBreweryPageFilters()}>

            </BreweryCatalog>
        </div>
    )
}