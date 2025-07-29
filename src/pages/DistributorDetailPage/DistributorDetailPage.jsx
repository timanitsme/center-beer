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
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp";


export default function DistributorDetailPage(){
    useEffect(() => {
        document.title = `center.beer | Дистрибьютор`
    }, []);

    return(
        <div className="content">
            <NavChain paths={getDistributorDetailPagePaths()}/>
            <DistributorInfo></DistributorInfo>
            <div style={{backgroundImage: `url(${contactsBg})`, backgroundRepeat: 'no-repeat'}}>
                <DistributorAdvantagesList></DistributorAdvantagesList>
                <DistributorPortfolio/>
            </div>
            <BeerCatalogSection filters={getDistributorDetailPageFilters()} filterButtons={getDistributorDetailPageFilterButtons()}/>
        </div>
    )
}