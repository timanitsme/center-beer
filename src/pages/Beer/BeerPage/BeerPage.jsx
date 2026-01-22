import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import {getBeerPagePaths} from "./BeerPageData.jsx";
import BeerCatalog from "../../../components/Catalogs/BeerCatalog.jsx";
import {useEffect} from "react";
import contactsBg from "../../../assets/bgPictures/contacts-bg.webp"

export default function BeerPage(){
    useEffect(() => {
        document.title = `center.beer | Пиво`
    }, []);

    return(
        <div className="content">
            <NavChain paths={getBeerPagePaths()}/>
            <BeerCatalog bgImage={contactsBg} withoutPrice={true}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}