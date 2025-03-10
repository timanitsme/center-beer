import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {
    getDistributorDetailPageFilterButtons,
    getDistributorDetailPageFilters,
    getDistributorDetailPagePaths
} from "./DistributorDetailPageData.jsx";
import DistributorInfo from "../../components/DetailInfo/DistributorInfo/DistributorInfo.jsx";
import DistributorAdvantagesList from "../../components/AdvantagesList/DistributorAdvantagesList/DistributorAdvantagesList.jsx";
import DistributorPortfolio from "../../components/DistributorPortfolio/DistributorPortfolio.jsx";
import BeerCatalogSection from "../../components/BeerCatalogSection/BeerCatalogSection.jsx";


export default function DistributorDetailPage(){
    return(
        <div className="content">
            <NavChain paths={getDistributorDetailPagePaths()}/>
            <DistributorInfo></DistributorInfo>
            <DistributorAdvantagesList></DistributorAdvantagesList>
            <DistributorPortfolio/>
            <BeerCatalogSection filters={getDistributorDetailPageFilters()} filterButtons={getDistributorDetailPageFilterButtons()}/>
        </div>
    )
}