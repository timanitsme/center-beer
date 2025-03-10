import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import DistributorsCatalog from "../../components/Catalogs/DistributorsCatalog.jsx";
import {getDistributorsPageFilters, getDistributorsPagePaths} from "./DistributorsPageData.jsx";


export default function DistributorsPage(){
    return(
        <div className="content">
            <NavChain paths={getDistributorsPagePaths()}/>
            <DistributorsCatalog filters={getDistributorsPageFilters()}>

            </DistributorsCatalog>
        </div>
    )
}