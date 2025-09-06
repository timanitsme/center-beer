import './App.scss'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import ErrorBoundary from "./utils/ErrorBoundary/ErrorBoundary.jsx";
import BottleIcon from "./assets/bottle-icon.svg?react";
import {lazy, Suspense, useEffect, useState} from "react";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop.jsx";
import useAuth from "./store/utils/customHooks/useAuth.js";
import {useDispatch} from "react-redux";
import {initializeAuthState} from "./store/services/authSlice.js";
import CookieConsent from "./components/CookieConsent/CookieConsent.jsx";
import AdultsOnlyModal from "./components/Modals/SimpleModal/AdultsOnlyModal.jsx";
import indexBubblesBg from "./assets/bgPictures/index-bubbles-bg.webp";

const BarCustomEventsPage = lazy(() => import("./pages/BarCustomEventsPage/BarCustomEventsPage.jsx"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage.jsx"));
const RestaurantEventsPage = lazy(() => import("./pages/Events/RestaurantEventsPage/RestaurantEventsPage.jsx"));
const BreweryEventsPage = lazy(() => import("./pages/Events/BreweryEventsPage/BreweryEventsPage.jsx"));
const FestivalsPage = lazy(() => import("./pages/Events/FestivalsPage/FestivalsPage.jsx"));
const EventMapPage = lazy(() => import("./pages/Events/EventMapPage/EventMapPage.jsx"));
const BarDetailPage = lazy(() => import("./pages/Bars/BarDetailPage/BarDetailPage.jsx"));
const BeerPage = lazy(() => import("./pages/Beer/BeerPage/BeerPage.jsx"));
const EventsPage = lazy(() => import("./pages/Events/EventsPage/EventsPage.jsx"));
const AboutPage = lazy(() => import("./pages/About/AboutPage/AboutPage.jsx"));
const NewsPage = lazy(() => import("./pages/News/NewsPage/NewsPage.jsx"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage.jsx"));
const BarsPage = lazy(() => import("./pages/Bars/BarsPage/BarsPage.jsx"));
const BeerDetailPage = lazy(() => import("./pages/Beer/BeerDetailPage/BeerDetailPage.jsx"));
const BreweryDetailPage = lazy(() => import("./pages/Breweries/BreweryDetailPage/BreweryDetailPage.jsx"));
const BreweryPage = lazy(() => import("./pages/Breweries/BreweryPage/BreweryPage.jsx"));
const BeerMapPage = lazy(() => import("./pages/BeerMapPage/BeerMapPage.jsx"));
const NewsDetailPage = lazy(() => import("./pages/News/NewsDetailPage/NewsDetailPage.jsx"));
const IndexPage = lazy(() => import("./pages/IndexPage/IndexPage.jsx"));
const DistributorsPage = lazy(() => import("./pages/DistributorsPage/DistributorsPage.jsx"));
const DistributorDetailPage = lazy(() => import("./pages/DistributorDetailPage/DistributorDetailPage.jsx"));
const PersonalAccountPage = lazy(() => import("./pages/PersonalAccountPage/PersonalAccountPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage/CartPage.jsx"));
const AuthorizationPage = lazy(() => import("./pages/AuthorizationPage/AuthorizationPage.jsx"));
const RestorePasswordPage = lazy(() => import("./pages/RestorePasswordPage/RestorePasswordPage.jsx"));
const EventDetailPage = lazy(() => import("./pages/Events/EventDetailPage/EventDetailPage.jsx"));
const InDevelopmentPage = lazy(() => import("./pages/InDevelopmentPage/InDevelopmentPage.jsx"));
const WillBeSoonPage = lazy(() => import("./pages/WillBeSoonPage/WillBeSoonPage.jsx"));
const MyCheckinsPage = lazy(() => import("./pages/PersonalAccountPage/MyCheckinsPage/MyCheckinsPage.jsx"));
const EventMapPageMobile = lazy(() => import("./pages/Events/EventMapPage/EventMapPageMobile.jsx"));
const EarnCBPage = lazy(() => import("./pages/PersonalAccountPage/EarnCBPage/EarnCBPage.jsx"));
const MyFavoritePage = lazy(() => import("./pages/PersonalAccountPage/MyFavoritePage/MyFavoritePage.jsx"));
const MyBookmarksPage = lazy(() => import("./pages/PersonalAccountPage/MyBookmarksPage/MyBookmarksPage.jsx"));
const AboutDetailPage = lazy(() => import("./pages/About/AboutDetailPage/AboutDetailPage.jsx"));
const DocumentDetailPage = lazy(() => import("./pages/Documents/DocumentDetailPage/DocumentDetailPage.jsx"));
const BalanceHistory = lazy(() => import("./pages/PersonalAccountPage/BalanceHistory/BalanceHistory.jsx"));
const BugReportPage = lazy(() => import("./pages/BugReportPage/BugReportPage.jsx"));
const AllSimilarBeerPage = lazy(() => import("./pages/Beer/AllSimilarBeerPage/AllSimilarBeerPage.jsx"));
const PersonalInfoPage = lazy(() => import("./pages/PersonalAccountPage/PersonalInfoPage/PersonalInfoPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));

function App() {
    const dispatch = useDispatch();
    const {isAuthorized, userProfile, isLoading, error} = useAuth()
    const location = useLocation()
    useEffect(() => {
        dispatch(initializeAuthState());
    }, [dispatch]);

    const paths = [
        {title: "Пиво", path: "/beer", element: BeerPage},
        {title: "Бары и магазины", path: "/bars", element: BarsPage, children: [
                {title: "Бары", path: "/bars"},
                {title: "Пивоварни", path: "/breweries"},
                {title: "Дистрибьюторы", path: "/distributors"},
                {title: "Карта баров", path: "/map"}
            ]},
        {title: "Мероприятия", path: "/events", element: EventsPage}, // /events
        {title: "Партнерам", path: "/about-us", element: AboutPage},
        {title: "Новости", path: "/news", element: NewsPage},
        {title: "Контакты", path: "/contacts", element: ContactsPage}, // /contacts
    ]
    const anonymousPaths = [
        {path: "/", element: IndexPage},
        {path: "/breweries", element: BreweryPage},
        {path: "/distributors", element: DistributorsPage},
        {path: "/bar/:alias", element: BarDetailPage },
        {path: "/beer/:alias", element: BeerDetailPage},
        {path: "/beer/:alias/similar", element: AllSimilarBeerPage},
        {path: "/brewery/:alias", element: BreweryDetailPage},
        {path: "/news/:id", element: NewsDetailPage},
        {path: "/map", element: BeerMapPage},
        {path: "/distributor/:id", element: DistributorDetailPage},
        {path: "/event-map/", element: EventMapPage, hideFooter: true},
        {path: "/event-map-mobile/", element: EventMapPageMobile, hideFooter: true, hideHeader: true},
        {path: "/login/", element: AuthorizationPage},
        {path: "/restore/", element: RestorePasswordPage},
        {path: "/account/", element: PersonalAccountPage},
        {path: "/account/info", element: PersonalInfoPage},
        {path: "/account/fav/:alias", element: MyFavoritePage},
        {path: "/account/bookmarked/:alias", element: MyBookmarksPage},
        {path: "/account/earn-cb/", element: EarnCBPage},
        {path: "/account/balance-history/", element: BalanceHistory},
        {path: "/signup/", element: RegistrationPage},
        {path: "/cart/", element: CartPage},
        {path: "/events/restaurants", element: RestaurantEventsPage},
        {path: "/events/breweries", element: BreweryEventsPage},
        {path: "/events/festivals", element: FestivalsPage},
        {path: "/events/:id", element: EventDetailPage},
        {path: "/events/:id", element: EventDetailPage},
        {path: "/in-dev", element: InDevelopmentPage},
        {path: "/will-be-soon", element: WillBeSoonPage},
        {path: "/my-check-ins/:alias", element: MyCheckinsPage},
        {path: "/about-us/:alias", element: AboutDetailPage},
        {path: "/bug-report", element: BugReportPage},
        {path: "/test", element: BarCustomEventsPage},
        {path: "/documents/:alias", element: DocumentDetailPage, hideFooter: true},
        {path: "*", element: NotFoundPage},
    ]
    const [hideFooter, setHideFooter] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    console.log(window.location.pathname)
    return (
    <>
        <div className="app" style={location.pathname === "/"? {backgroundImage: `url(${indexBubblesBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top'}: {}}>
            {!hideHeader && <Header paths={paths}/>}
            <div className="contentContainer">
                <Suspense fallback={<div className="fallback"><BottleIcon/></div>}>
                    <Routes>
                        {paths.map((path) => {
                            return(<Route key={path.path} path={path.path} element={<ErrorBoundary>
                                <path.element setHideFooter={setHideFooter} setHideHeader={setHideHeader}/>
                            </ErrorBoundary>}/>)
                        })}
                        {anonymousPaths.map((path) => {
                            return(<Route key={path.path} path={path.path} element={<ErrorBoundary>
                                <path.element setHideFooter={setHideFooter} setHideHeader={setHideHeader}/>
                            </ErrorBoundary>}/>)
                        })}
                    </Routes>
                </Suspense>
                {!hideFooter && <img className="bottle" src={bottlePath} ></img>}
                {!hideFooter && <Footer />}
            </div>
        </div>
        <CookieConsent/>
        <AdultsOnlyModal/>
        <ScrollToTop/>
    </>
  )
}

export default App
