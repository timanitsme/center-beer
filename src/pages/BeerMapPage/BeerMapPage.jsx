import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {getBeerMapPageFilterButtons, getBeerMapPageFilters, getBeerMapPagePaths} from "./BeerMapPageData.jsx";
import BeerMapCatalog from "../../components/Catalogs/BeerMapCatalog.jsx";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function BeerMapPage(){
    const location = useLocation();
    const showBar = location.state?.id || null;

    useEffect(() => {
        document.title = `center.beer | Карта баров`
    }, []);


    return(
        <div className="content">
            <NavChain paths={getBeerMapPagePaths()}/>
            <BeerMapCatalog filters={getBeerMapPageFilters()} filterButtons={getBeerMapPageFilterButtons()} id={showBar}/>
        </div>
    )
}