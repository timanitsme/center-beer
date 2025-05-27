import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {getBreweryPageFilters, getBreweryPagePaths} from "./BreweryPageData.jsx";
import BreweryCatalog from "../../../components/Catalogs/BreweryCatalog.jsx";
import {useEffect} from "react";

export default function BreweryPage(){
    useEffect(() => {
        document.title = `center.beer | Пивоварни`
    }, []);
    return(
        <div className="content">
            <NavChain paths={getBreweryPagePaths()}/>
            <BreweryCatalog filters={getBreweryPageFilters()}>

            </BreweryCatalog>
        </div>
    )
}