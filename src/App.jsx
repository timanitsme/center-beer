import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import BarDetailPage from "./pages/Bars/BarDetailPage/BarDetailPage.jsx";
import BeerPage from "./pages/Beer/BeerPage/BeerPage.jsx";
import EventsPage from "./pages/Events/EventsPage/EventsPage.jsx";
import AboutPage from "./pages/About/AboutPage/AboutPage.jsx";
import NewsPage from "./pages/News/NewsPage/NewsPage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import BarsPage from "./pages/Bars/BarsPage/BarsPage.jsx";
import BeerDetailPage from "./pages/Beer/BeerDetailPage/BeerDetailPage.jsx";
import BreweryDetailPage from "./pages/Breweries/BreweryDetailPage/BreweryDetailPage.jsx";
import BreweryPage from "./pages/Breweries/BreweryPage/BreweryPage.jsx";
import BeerMapPage from "./pages/BeerMapPage/BeerMapPage.jsx";
import NewsDetailPage from "./pages/News/NewsDetailPage/NewsDetailPage.jsx";
import IndexPage from "./pages/IndexPage/IndexPage.jsx";
import DistributorsPage from "./pages/DistributorsPage/DistributorsPage.jsx";
import DistributorDetailPage from "./pages/DistributorDetailPage/DistributorDetailPage.jsx";
import PersonalAccountPage from "./pages/PersonalAccountPage/PersonalAccountPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage.jsx";
import RestorePasswordPage from "./pages/RestorePasswordPage/RestorePasswordPage.jsx";
import ErrorBoundary from "./utils/ErrorBoundary/ErrorBoundary.jsx";
import EventMapPage from "./pages/Events/EventMapPage/EventMapPage.jsx";
import {cloneElement, useEffect, useState} from "react";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import RestaurantEventsPage from "./pages/Events/RestaurantEventsPage/RestaurantEventsPage.jsx";
import BreweryEventsPage from "./pages/Events/BreweryEventsPage/BreweryEventsPage.jsx";
import FestivalsPage from "./pages/Events/FestivalsPage/FestivalsPage.jsx";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop.jsx";
import EventDetailPage from "./pages/Events/EventDetailPage/EventDetailPage.jsx";
import InDevelopmentPage from "./pages/InDevelopmentPage/InDevelopmentPage.jsx";
import WillBeSoonPage from "./pages/WillBeSoonPage/WillBeSoonPage.jsx";
import MyCheckinsPage from "./pages/PersonalAccountPage/MyCheckinsPage/MyCheckinsPage.jsx";
import EventMapPageMobile from "./pages/Events/EventMapPage/EventMapPageMobile.jsx";
import EarnCBPage from "./pages/PersonalAccountPage/EarnCBPage/EarnCBPage.jsx";
import useAuth from "./store/utils/customHooks/useAuth.js";
import {useDispatch} from "react-redux";
import {initializeAuthState} from "./store/services/authSlice.js";
import MyFavoritePage from "./pages/PersonalAccountPage/MyFavoritePage/MyFavoritePage.jsx";
import MyBookmarksPage from "./pages/PersonalAccountPage/MyBookmarksPage/MyBookmarksPage.jsx";
import AboutDetailPage from "./pages/About/AboutDetailPage/AboutDetailPage.jsx";
import DocumentDetailPage from "./pages/Documents/DocumentDetailPage/DocumentDetailPage.jsx";
import CookieConsent from "./components/CookieConsent/CookieConsent.jsx";
import AdultsOnlyModal from "./components/Modals/SimpleModal/AdultsOnlyModal.jsx";
import BalanceHistory from "./pages/PersonalAccountPage/BalanceHistory/BalanceHistory.jsx";
import BugReportPage from "./pages/BugReportPage/BugReportPage.jsx";
import AllSimilarBeerPage from "./pages/Beer/AllSimilarBeerPage/AllSimilarBeerPage.jsx";

function App() {
    const dispatch = useDispatch();
    const {isAuthorized, userProfile, isLoading, error} = useAuth()

    useEffect(() => {
        dispatch(initializeAuthState());
    }, [dispatch]);

    const paths = [
        {title: "Пиво", path: "/beer", element: <BeerPage/>},
        {title: "Бары и магазины", path: "/bars", element: <BarsPage/>, children: [
                {title: "Бары", path: "/bars"},
                {title: "Пивоварни", path: "/breweries"},
                {title: "Дистрибьюторы", path: "/distributors"},
                {title: "Карта баров", path: "/map"}
            ]},
        {title: "Мероприятия", path: "/events", element: <EventsPage/>}, // /events
        {title: "Партнерам", path: "/about-us", element: <AboutPage/>},
        {title: "Новости", path: "/news", element: <NewsPage/>},
        {title: "Контакты", path: "/contacts", element: <ContactsPage/>}, // /contacts
    ]
    const anonymousPaths = [
        {path: "/", element: <IndexPage/>},
        {path: "/breweries", element: <BreweryPage/>},
        {path: "/distributors", element: <DistributorsPage/>},
        {path: "/bar/:alias", element: <BarDetailPage/> },
        {path: "/beer/:alias", element: <BeerDetailPage/>},
        {path: "/beer/:alias/similar", element: <AllSimilarBeerPage/>},
        {path: "/brewery/:alias", element: <BreweryDetailPage/>},
        {path: "/news/:id", element: <NewsDetailPage/>},
        {path: "/map", element: <BeerMapPage/>},
        {path: "/distributor/:id", element: <DistributorDetailPage/>},
        {path: "/event-map/", element: <EventMapPage/>, hideFooter: true},
        {path: "/event-map-mobile/", element: <EventMapPageMobile/>, hideFooter: true, hideHeader: true},
        {path: "/login/", element: <AuthorizationPage/>},
        {path: "/account/", element: <PersonalAccountPage/>},
        {path: "/account/fav/:alias", element: <MyFavoritePage/>},
        {path: "/account/bookmarked/:alias", element: <MyBookmarksPage/>},
        {path: "/account/earn-cb/", element: <EarnCBPage/>},
        {path: "/account/balance-history/", element: <BalanceHistory/>},
        {path: "/signup/", element: <RegistrationPage/>},
        {path: "/cart/", element: <CartPage/>},
        {path: "/events/restaurants", element: <RestaurantEventsPage/>},
        {path: "/events/breweries", element: <BreweryEventsPage/>},
        {path: "/events/festivals", element: <FestivalsPage/>},
        {path: "/events/:id", element: <EventDetailPage/>},
        {path: "/in-dev", element: <InDevelopmentPage/>},
        {path: "/will-be-soon", element: <WillBeSoonPage/>},
        {path: "/my-check-ins/:alias", element: <MyCheckinsPage/>},
        {path: "/about-us/:alias", element: <AboutDetailPage/>},
        {path: "/bug-report", element: <BugReportPage/>},
        {path: "/documents/:alias", element: <DocumentDetailPage/>, hideFooter: true},
    ]
    const [hideFooter, setHideFooter] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    return (
    <BrowserRouter>
        <div className="app">
            {!hideHeader && <Header paths={paths}/>}
            <div className="contentContainer">
                <Routes>
                    {paths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={<ErrorBoundary>{cloneElement(path.element, { setHideFooter, setHideHeader })}</ErrorBoundary>}/>)
                    })}
                    {anonymousPaths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={<ErrorBoundary>{cloneElement(path.element, { setHideFooter, setHideHeader })}</ErrorBoundary>}/>)
                    })}
                </Routes>
                {!hideFooter && <img className="bottle" src={bottlePath}></img>}
                {!hideFooter && <Footer />}
            </div>
        </div>
        <CookieConsent/>
        <AdultsOnlyModal/>
        <ScrollToTop/>
    </BrowserRouter>
  )
}

export default App
