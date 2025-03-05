import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import BarsCatalog from "../../components/Catalogs/BarsCatalog.jsx";
import {getBarsPageFilterButtons, getBarsPageFilters} from "./BarsPageData.jsx";

export default function BarsPage(){
    const paths = [
        {title:"beer.center", path: "/"},
        {title:"Бары и магазины", path: "/"},
    ]


    return(
        <div className="content">
            <NavChain paths={paths}/>
            <BarsCatalog filterButtons={getBarsPageFilterButtons()} filters={getBarsPageFilters()}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}