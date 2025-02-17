import NavChain from "../../components/NavChain/NavChain.jsx";
import BarInfo from "../../components/BarInfo/BarInfo.jsx";
import BarEvents from "../../components/BarEvents/BarEvents.jsx";
import AdvantagesList from "../../components/AdvantagesList/AdvantagesList.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import CurrentPromos from "../../components/CurrentPromos/CurrentPromos.jsx";
import BarMenu from "../../components/BarMenu/BarMenu.jsx";
import {isMobile} from "react-device-detect";

export default function BarPage(){
    return(
        <div className="content">
            <NavChain/>
            <BarInfo/>
            <BarEvents/>
            <AdvantagesList/>
            <Gallery/>
            <BarMenu/>
            <CurrentPromos/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}