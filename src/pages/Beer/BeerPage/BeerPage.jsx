import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import {getBeerPagePaths} from "./BeerPageData.jsx";
import BeerCatalog from "../../../components/Catalogs/BeerCatalog.jsx";
import {useEffect} from "react";

export default function BeerPage(){
    useEffect(() => {
        document.title = `center.beer | Пиво`
    }, []);

    return(
        <div className="content">
            <NavChain paths={getBeerPagePaths()}/>
            <BeerCatalog/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}