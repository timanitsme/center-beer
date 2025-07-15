import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {GetPersonalAccountPaths} from "./PersonalAccountPageData.jsx";
import PersonalAccount from "../../components/PersonalAccount/PersonalAccount.jsx";
import ActiveOrders from "../../components/ActiveOrders/ActiveOrders.jsx";
import LatestReviews from "../../components/LatestReviews/LatestReviews.jsx";
import {useEffect, useMemo, useState} from "react";
import SingleImageModal from "../../components/Modals/SingleImageModal/SingleImageModal.jsx";
import EventImage from "../../assets/eventsMocks/event-picture-1.svg"
import BarImage1 from "../../assets/barsMocks/bar-3.svg";
import BarImage2 from "../../assets/barsMocks/bar-2.svg";
import BarImage3 from "../../assets/barsMocks/bar-5.svg";
import BarImage4 from "../../assets/barsMocks/bar-4.svg";
import {isMobile} from "react-device-detect";
import BeerCheckInCard from "../../components/Cards/CheckIns/BeerCheckInCard/BeerCheckInCard.jsx";
import SwitchRowSection from "../../components/SwitchRowSection/SwitchRowSection.jsx";
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
import PersonalAccountMobile from "../../components/PersonalAccount/PersonalAccountMobile.jsx";
import MinimalBarCardSkeleton from "../../components/Skeletons/MinimalBarCardSkeleton/MinimalBarCardSkeleton.jsx";
import MinimalBottledBeerCardSkeleton
    from "../../components/Skeletons/MinimalBottledBeerCardSkeleton/MinimalBottledBeerCardSkeleton.jsx";

export default function PersonalAccountPage(){
    const { isAuthorized, userProfile, isLoading: profileIsLoading, isRefreshing } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const {data: barCuddy, isLoading: barCuddyIsLoading, error: barCuddyError, isFetching: barCuddyIsFetching} = useGetUsersCuddyBarsQuery(userProfile?.id, {skip: !userProfile})
    const {data: beerCuddy, isLoading: beerCuddyIsLoading, error: beerCuddyError, isFetching: beerCuddyIsFetching} = useGetUsersCuddyBeersQuery(userProfile?.id, {skip: !userProfile})

    useEffect(() => {
        document.title = `center.beer | Профиль`
    }, []);

    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
    ]

    const {data: barFavs, isLoading: barFavsIsLoading, error: barFavsError, isFetching: barFavsIsFetching} = useGetUsersFavBarsQuery(userProfile?.id, {skip: !userProfile?.id})
    const {data: beerFavs, isLoading: beerFavsIsLoading, error: beerFavsError, isFetching: beerFavsIsFetching} = useGetUsersFavBeersQuery(userProfile?.id, {skip: !userProfile?.id})

    const cuddySwitch = [
        {
            title: "Бары",
            cards: barCuddy,
            CardComponent: MinimalBarCardApi,
            SkeletonCardComponent: MinimalBarCardSkeleton,
            isLoading: barCuddyIsLoading,
            isFetching: barCuddyIsFetching,
            error: barCuddyError,
        },
        {
            title: "Пиво",
            cards: beerCuddy,
            CardComponent: MinimalBottledBeerCardApi,
            SkeletonCardComponent: MinimalBottledBeerCardSkeleton,
            isLoading: beerCuddyIsLoading,
            isFetching: beerCuddyIsFetching,
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

    if (!isAuthorized && !profileIsLoading && !userProfile && !isRefreshing){
        console.log(`isAuthorized: ${isAuthorized} profileIsLoading: ${profileIsLoading} userProfile: ${userProfile}`)
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
                            {isMobile && <PersonalAccountMobile profile={userProfile}/>}
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