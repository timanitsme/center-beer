import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import DistributorsCatalog from "../../components/Catalogs/DistributorsCatalog.jsx";
import {getDistributorsPageFilters, getDistributorsPagePaths} from "./DistributorsPageData.jsx";
import {useEffect} from "react";


export default function DistributorsPage(){
    useEffect(() => {
        document.title = `center.beer | Дистрибьюторы`
    }, []);

    return(
        <div className="content">
            <NavChain paths={getDistributorsPagePaths()}/>
            <DistributorsCatalog filters={getDistributorsPageFilters()}>

            </DistributorsCatalog>
        </div>
    )
}