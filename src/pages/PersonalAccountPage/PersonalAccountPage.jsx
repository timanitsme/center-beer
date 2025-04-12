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
import ShortenedRowSection from "../../components/ShortenedRowSection/ShortenedRowSection.jsx";
import BarImage1 from "../../assets/barsMocks/bar-3.svg";
import BarImage2 from "../../assets/barsMocks/bar-2.svg";
import BarImage3 from "../../assets/barsMocks/bar-5.svg";
import BarImage4 from "../../assets/barsMocks/bar-4.svg";
import MinimalBarCard from "../../components/Cards/BarCard/MinimalBarCard.jsx";
import BeerImage1 from "../../assets/bottlesMock/bottle-1.svg"
import BeerImage2 from "../../assets/bottlesMock/bottle-2.svg"
import BeerImage3 from "../../assets/bottlesMock/bottle-3.svg"
import BeerImage4 from "../../assets/bottlesMock/bottle-4.svg"
import BeerImage5 from "../../assets/bottlesMock/bottle-5.svg"
import MinimalBottledBeerCard from "../../components/Cards/BottledBeerCard/MinimalBottledBeerCard.jsx";
import {isMobile} from "react-device-detect";

export default function PersonalAccountPage(){
    const [showModal, setShowModal] = useState(false)
    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
    ]

    const beerCards = [
        {is_favor: false, is_liked: false, photo: BeerImage1, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: true, is_liked: true, photo: BeerImage2, name: "Der stern", rating: 5, brewery_name: "Бакунин", city: "Санкт-Петербург", country: "Россия"},
        {is_favor: true, is_liked: false, photo: BeerImage3, name: "Небо над тагилом", rating: 3.5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: false, is_liked: false, photo: BeerImage4, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: false, is_liked: false, photo: BeerImage5, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
    ]

    return(
        <div className="content">
            <NavChain paths={GetPersonalAccountPaths()}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccount isMobile={true}/>}
                    <ActiveOrders></ActiveOrders>
                    <LatestReviews></LatestReviews>
                    <ShortenedRowSection title="Избранные бары" cards={barCards} CardComponent={MinimalBarCard}></ShortenedRowSection>
                    <ShortenedRowSection title="Избранное пиво" cards={beerCards} CardComponent={MinimalBottledBeerCard}></ShortenedRowSection>
                </div>
            </div>
            <SingleImageModal show={showModal} setShow={setShowModal} src={EventImage}></SingleImageModal>

        </div>
    )
}