import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {GetPersonalAccountPaths} from "./PersonalAccountPageData.jsx";
import PersonalAccount from "../../components/PersonalAccount/PersonalAccount.jsx";
import ActiveOrders from "../../components/ActiveOrders/ActiveOrders.jsx";
import LatestReviews from "../../components/LatestReviews/LatestReviews.jsx";
import SimpleModal from "../../components/Modals/SimpleModal/SimpleModal.jsx";
import SimpleButton from "../../components/Buttons/SimpleButton/SimpleButton.jsx";
import {useState} from "react";
import SingleImageModal from "../../components/Modals/SingleImageModal/SingleImageModal.jsx";
import EventImage from "../../assets/eventsMocks/event-picture-1.svg"

export default function PersonalAccountPage(){
    const [showModal, setShowModal] = useState(false)

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
            <SimpleButton text={"Нажми меня"} onClick={() => setShowModal(true)}></SimpleButton>
            <SingleImageModal show={showModal} setShow={setShowModal} src={EventImage}></SingleImageModal>

        </div>
    )
}