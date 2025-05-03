import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {GetPersonalAccountPaths} from "./PersonalAccountPageData.jsx";
import PersonalAccount from "../../components/PersonalAccount/PersonalAccount.jsx";
import ActiveOrders from "../../components/ActiveOrders/ActiveOrders.jsx";
import LatestReviews from "../../components/LatestReviews/LatestReviews.jsx";
import SimpleModal from "../../components/Modals/SimpleModal/SimpleModal.jsx";
import SimpleButton from "../../components/Buttons/SimpleButton/SimpleButton.jsx";
import {useEffect, useMemo, useState} from "react";
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
import BeerCheckInCard from "../../components/Cards/CheckIns/BeerCheckInCard/BeerCheckInCard.jsx";
import SwitchRowSection from "../../components/SwitchRowSection/SwitchRowSection.jsx";
import MinimalBreweryCard from "../../components/Cards/BreweryCard/MinimalBreweryCard/MinimalBreweryCard.jsx";
import Brewery1 from "../../assets/breweryMocks/brewery-logo-1.svg"
import Brewery2 from "../../assets/breweryMocks/brewery-logo-2.svg"
import Brewery3 from "../../assets/breweryMocks/brewery-logo-3.svg"
import Brewery4 from "../../assets/breweryMocks/brewery-logo-4.svg"
import Brewery5 from "../../assets/breweryMocks/brewery-logo-5.svg"
import BarCheckInCard from "../../components/Cards/CheckIns/BarCheckInCard/BarCheckInCard.jsx";
import {useSelector} from "react-redux";
import {
    useGetUsersCuddyBarsQuery, useGetUsersCuddyBeersQuery,
    useGetUsersFavBarsQuery,
    useGetUsersFavBeersQuery
} from "../../store/services/centerBeer.js";
import SwitchRowSectionApi from "../../components/SwitchRowSection/SwitchRowSectionApi.jsx";
import MinimalBarCardApi from "../../components/Cards/BarCard/MinimalBarCardApi.jsx";
import MinimalBottledBeerCardApi from "../../components/Cards/BottledBeerCard/MinimalBottledBeerCardApi.jsx";
import {useNavigate} from "react-router-dom";

export default function PersonalAccountPage(){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const {data: barCuddy, isLoading: barCuddyIsLoading, error: barCuddyError} = useGetUsersCuddyBarsQuery(userProfile?.id, {skip: !userProfile})
    const {data: beerCuddy, isLoading: beerCuddyIsLoading, error: beerCuddyError} = useGetUsersCuddyBeersQuery(userProfile?.id, {skip: !userProfile})




    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
    ]

    const {data: barFavs, isLoading: barFavsIsLoading, error: barFavsError} = useGetUsersFavBarsQuery(userProfile?.id, {skip: !userProfile?.id})
    const {data: beerFavs, isLoading: beerFavsIsLoading, error: beerFavsError} = useGetUsersFavBeersQuery(userProfile?.id, {skip: !userProfile?.id})

    const cuddySwitch = [
        {
            title: "Бары",
            cards: barCuddy,
            CardComponent: MinimalBarCardApi,
            isLoading: barCuddyIsLoading,
            error: barCuddyError,
        },
        {
            title: "Пиво",
            cards: beerCuddy,
            CardComponent: MinimalBottledBeerCardApi,
            isLoading: beerCuddyIsLoading,
            error: beerCuddyError,
        },
    ]

    const [cuddySelectedOption, setCuddySelectedOption] = useState(cuddySwitch[0])


    const favSwitch = [
        {
            title: "Бары",
            cards: barFavs,
            CardComponent: MinimalBarCardApi,
            isLoading: barFavsIsLoading,
            error: barFavsError,
        },
        {
            title: "Пиво",
            cards: beerFavs,
            CardComponent: MinimalBottledBeerCardApi,
            isLoading: beerFavsIsLoading,
            error: beerFavsError,
        },
    ]

    const [favSelectedOption, setFavSelectedOption] = useState(favSwitch[0])



    const barsCards = [
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},

    ]

    const checkInSwitch = [
        {title: "Пиво", cards: barCards, CardComponent: BeerCheckInCard, maxCards: 4},
        {title: "Бары", cards: barsCards, CardComponent: BarCheckInCard},

    ]

    useEffect(() => {
        // Обновляем cuddySelectedOption, если данные для barCuddy или beerCuddy изменились
        setCuddySelectedOption((prev) => {
            const updatedOption = cuddySwitch.find((option) => option.title === prev.title);
            return updatedOption || cuddySwitch[0];
        });
    }, [barCuddy, beerCuddy]);

    useEffect(() => {
        // Обновляем favSelectedOption, если данные для barFavs или beerFavs изменились
        setFavSelectedOption((prev) => {
            const updatedOption = favSwitch.find((option) => option.title === prev.title);
            return updatedOption || favSwitch[0];
        });
    }, [barFavs, beerFavs]);

    if (!isAuthorized && !profileIsLoading && !userProfile){
        navigate("/login");
    }

    return(
        <div className="content">
            <NavChain paths={GetPersonalAccountPaths()}></NavChain>
            {isAuthorized && !profileIsLoading && userProfile &&
                <>
                    <div style={{display: "flex"}}>
                        {!isMobile && <PersonalAccount profile={userProfile}/>}
                        <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                            {isMobile && <PersonalAccount profile={userProfile} isMobile={true}/>}
                            <SwitchRowSection title="Чек-ины" options={checkInSwitch}/>
                            <ActiveOrders></ActiveOrders>
                            <LatestReviews></LatestReviews>
                            {/*<SwitchRowSection title="Избранное" options={likedSwitch}/>*/}
                            {/*<SwitchRowSection title="Кладовка" options={favSwitch}/>*/}
                            {/*!barCuddyIsLoading && !barCuddyError && barCuddy?.data?.length > 0 && <SwitchRowSectionApi title="Бары в кладовке" option={{title: "Бары", cards: barCuddy, CardComponent: MinimalBarCardApi}}></SwitchRowSectionApi>*/}
                            {/*!beerCuddyIsLoading && !beerCuddyError && beerCuddy?.data?.length > 0 && <SwitchRowSectionApi title="Пиво в кладовке" option={{title: "Бары", cards: beerCuddy, CardComponent: MinimalBottledBeerCardApi}}></SwitchRowSectionApi>*/}
                            {/*!barFavsIsLoading && !barFavsError && barFavs?.data?.length > 0 && <SwitchRowSectionApi title="Избранные бары" option={{title: "Бары", cards: barFavs, CardComponent: MinimalBarCardApi}}></SwitchRowSectionApi>*/}
                            {/*!beerFavsIsLoading && !beerFavsError && beerFavs?.data?.length > 0 && <SwitchRowSectionApi title="Избранное пиво" option={{title: "Бары", cards: beerFavs, CardComponent: MinimalBottledBeerCardApi}}></SwitchRowSectionApi>*/}
                            <SwitchRowSectionApi title="Любимое" options={favSwitch} selectedOption={favSelectedOption} setSelectedOption={setFavSelectedOption} />
                            <SwitchRowSectionApi title="Кладовка" options={cuddySwitch} selectedOption={cuddySelectedOption} setSelectedOption={setCuddySelectedOption}/>
                        </div>
                    </div>
                    <SingleImageModal show={showModal} setShow={setShowModal} src={EventImage}></SingleImageModal>

                </>
            }
        </div>
    )
}