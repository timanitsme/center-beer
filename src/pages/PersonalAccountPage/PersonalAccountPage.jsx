import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {GetPersonalAccountPaths} from "./PersonalAccountPageData.jsx";
import PersonalAccount from "../../components/PersonalAccount/PersonalAccount.jsx";
import ActiveOrders from "../../components/ActiveOrders/ActiveOrders.jsx";
import LatestReviews from "../../components/LatestReviews/LatestReviews.jsx";


export default function PersonalAccountPage(){

    return(
        <div className="content">
            <NavChain paths={GetPersonalAccountPaths()}></NavChain>
            <div style={{display: "flex"}}>
                <PersonalAccount/>
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    <ActiveOrders></ActiveOrders>
                    <LatestReviews></LatestReviews>
                </div>
            </div>

        </div>
    )
}