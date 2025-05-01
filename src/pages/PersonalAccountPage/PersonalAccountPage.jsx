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

export default function PersonalAccountPage(){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false)

    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
    ]

    const {data: barFavs, isLoading: barFavsIsLoading, error: barFavsError} = useGetUsersFavBarsQuery(userProfile?.id, {skip: !userProfile?.id})
    const {data: beerFavs, isLoading: beerFavsIsLoading, error: beerFavsError} = useGetUsersFavBeersQuery(userProfile?.id, {skip: !userProfile?.id})

    const {data: barCuddy, isLoading: barCuddyIsLoading, error: barCuddyError} = useGetUsersCuddyBarsQuery(userProfile?.id, {skip: !userProfile?.id})
    const {data: beerCuddy, isLoading: beerCuddyIsLoading, error: beerCuddyError} = useGetUsersCuddyBeersQuery(userProfile?.id, {skip: !userProfile?.id})


    const beerCards = [
        {is_favor: false, is_liked: false, photo: BeerImage1, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: true, is_liked: true, photo: BeerImage2, name: "Der stern", rating: 5, brewery_name: "Бакунин", city: "Санкт-Петербург", country: "Россия"},
        {is_favor: true, is_liked: false, photo: BeerImage3, name: "Небо над тагилом", rating: 3.5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: false, is_liked: false, photo: BeerImage4, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
        {is_favor: false, is_liked: false, photo: BeerImage5, name: "Небо над тагилом", rating: 5, brewery_name: "Чаща", city: "Москва", country: "Россия"},
    ]

    const breweryCards = [
        {is_favor: false, is_liked: false, img: Brewery1, title: "Бакунин", address: "Солигорск, Беларусь"},
        {is_favor: true, is_liked: false, img: Brewery2, title: "Konix Brewery", address: "Заречный, Россия"},
        {is_favor: true, is_liked: true, img: Brewery3, title: "Paradox", address: "Солигорск, Беларусь"},
        {is_favor: true, is_liked: false, img: Brewery4, title: "Brauerei Puntigam", address: "Грац, Австрия"},
        {is_favor: false, is_liked: false, img: Brewery5, title: "Wild Lab", address: "Москва, Россия"},
    ]

    const barsCards = [
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},

    ]
    const likedSwitch = [
        {title: "Бары", cards: barCards, CardComponent: MinimalBarCard},
        {title: "Пиво", cards: beerCards, CardComponent: MinimalBottledBeerCard},
        {title: "Пивоварни", cards: breweryCards, CardComponent: MinimalBreweryCard},
    ]

    const favSwitch = [
        {title: "Бары", cards: barCards, CardComponent: MinimalBarCard},
        {title: "Пиво", cards: beerCards, CardComponent: MinimalBottledBeerCard},
        {title: "Пивоварни", cards: breweryCards, CardComponent: MinimalBreweryCard},
    ]

    const checkInSwitch = [
        {title: "Пиво", cards: barCards, CardComponent: BeerCheckInCard, maxCards: 4},
        {title: "Бары", cards: barsCards, CardComponent: BarCheckInCard},

    ]


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
                            {!barCuddyIsLoading && !barCuddyError && barCuddy?.data?.length > 0 && <SwitchRowSectionApi title="Бары в кладовке" option={{title: "Бары", cards: barCuddy, CardComponent: MinimalBarCardApi}}></SwitchRowSectionApi>}
                            {!beerCuddyIsLoading && !beerCuddyError && beerCuddy?.data?.length > 0 && <SwitchRowSectionApi title="Пиво в кладовке" option={{title: "Бары", cards: beerCuddy, CardComponent: MinimalBottledBeerCardApi}}></SwitchRowSectionApi>}
                            {!barFavsIsLoading && !barFavsError && barFavs?.data?.length > 0 && <SwitchRowSectionApi title="Избранные бары" option={{title: "Бары", cards: barFavs, CardComponent: MinimalBarCardApi}}></SwitchRowSectionApi>}
                            {!beerFavsIsLoading && !beerFavsError && beerFavs?.data?.length > 0 && <SwitchRowSectionApi title="Избранное пиво" option={{title: "Бары", cards: beerFavs, CardComponent: MinimalBottledBeerCardApi}}></SwitchRowSectionApi>}
                        </div>
                    </div>
                    <SingleImageModal show={showModal} setShow={setShowModal} src={EventImage}></SingleImageModal>

                </>
            }
        </div>
    )
}