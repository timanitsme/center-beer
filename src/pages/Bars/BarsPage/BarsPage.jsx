import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import BarsCatalog from "../../../components/Catalogs/BarsCatalog.jsx";
import {getBarsPageFilterButtons, getBarsPageFilters} from "./BarsPageData.jsx";
import {useEffect} from "react";

export default function BarsPage(){
    const paths = [
        {title:"center.beer", path: "/"},
        {title:"Бары и магазины", path: "/"},
    ]

    useEffect(() => {
        document.title = `center.beer | Бары`
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <BarsCatalog filterButtons={getBarsPageFilterButtons()} filters={getBarsPageFilters()}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}