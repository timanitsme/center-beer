import './App.scss'
import {BrowserRouter, matchPath, Route, Routes, useLocation} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import ErrorBoundary from "./utils/ErrorBoundary/ErrorBoundary.jsx";
import BottleIcon from "./assets/bottle-icon.svg?react";
import {lazy, Suspense, useEffect, useRef, useState} from "react";
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
        {title: "Мероприятия", path: "/events", element: EventsPage},
        {title: "Партнерам", path: "/about-us", element: AboutPage},
        {title: "Новости", path: "/news", element: NewsPage},
        {title: "Контакты", path: "/contacts", element: ContactsPage},
    ]

    const headerSidePaths = [
        {title: "Пиво", path: "/beer", element: BeerPage},
        {title: "Бары", path: "/bars"},
        {title: "Пивоварни", path: "/breweries"},
        {title: "Дистрибьюторы", path: "/distributors"},
        {title: "Карта баров", path: "/map"},
        {title: "Мероприятия", path: "/events", element: EventsPage},
        {title: "Партнерам", path: "/about-us", element: AboutPage},
        {title: "Новости", path: "/news", element: NewsPage},
        {title: "Контакты", path: "/contacts", element: ContactsPage},
    ]

    const anonymousPaths = [
        {path: "/", element: IndexPage, sections: [
                {id: "index-section", title: "Центральный портал о пиве"},
                {id: "index-visit-section", title: "О нас"},
                {id: "index-events", title: "Мероприятия"},
                {id: "beer-map-section", title: "Карта баров"},
                {id: "popular-posts", title: "Популярные статьи"},
                {id: "bar-news", title: "Новости"},
                {id: "quote-section", title: "Цитаты великих"},
            ]},
        {path: "/breweries", element: BreweryPage}, //
        {path: "/distributors", element: DistributorsPage}, //
        {path: "/bar/:alias", element: BarDetailPage, sections: [
                {id: "bar-info", title: "Информация"},
                {id: "bar-events", title: "Мероприятия"},
                {id: "gallery", title: "Галерея"},
                {id: "menu", title: "Меню"},
                {id: "current-promos", title: "Акции"},
                {id: "bar-news", title: "Новости"},
                {id: "reviews", title: "Отзывы"}
            ]},
        {path: "/beer/:alias", element: BeerDetailPage, sections: [
                {id: "beer-info", title: "Информация"},
                {id: "bars-row", title: "Где попробовать"},
                {id: "similar-items", title: "Похожее пиво"},
                {id: "reviews", title: "Отзывы"}
            ]},
        {path: "/beer/:alias/similar", element: AllSimilarBeerPage}, //
        {path: "/brewery/:alias", element: BreweryDetailPage, sections: [
                {id: "brewery-info", title: "Информация"},
                {id: "brewery-history", title: "История"},
                {id: "bar-events", title: "Новости"},
                {id: "gallery", title: "Галерея"},
                {id: "new-products", title: "Новинки"},
                {id: "bars-row", title: "Где попробовать"},
                {id: "beer-catalog", title: "Каталог пива"},
                {id: "reviews", title: "Отзывы"},
                {id: "excursions", title: "Экскурсии"},

            ]},
        {path: "/news/:id", element: NewsDetailPage}, // ???
        {path: "/map", element: BeerMapPage}, //
        {path: "/distributor/:id", element: DistributorDetailPage}, // Не сейчас
        {path: "/event-map/", element: EventMapPage, hideFooter: true}, // !!! Разобраться с высотой страницы
        {path: "/event-map-mobile/", element: EventMapPageMobile, hideFooter: true, hideHeader: true}, //
        {path: "/login/", element: AuthorizationPage}, //
        {path: "/restore/", element: RestorePasswordPage}, //
        {path: "/account/", element: PersonalAccountPage},
        {path: "/account/info", element: PersonalInfoPage}, // ??
        {path: "/account/fav/:alias", element: MyFavoritePage}, //
        {path: "/account/bookmarked/:alias", element: MyBookmarksPage}, //
        {path: "/account/earn-cb/", element: EarnCBPage}, //
        {path: "/account/balance-history/", element: BalanceHistory}, //
        {path: "/signup/", element: RegistrationPage}, //
        {path: "/cart/", element: CartPage}, // Не сейчас
        {path: "/events/restaurants", element: RestaurantEventsPage}, //
        {path: "/events/breweries", element: BreweryEventsPage}, //
        {path: "/events/festivals", element: FestivalsPage}, //
        {path: "/events/:id", element: EventDetailPage}, // Не сейчас
        {path: "/in-dev", element: InDevelopmentPage}, //
        {path: "/will-be-soon", element: WillBeSoonPage}, //
        {path: "/my-check-ins/:alias", element: MyCheckinsPage}, //
        {path: "/about-us/:alias", element: AboutDetailPage}, //
        {path: "/bug-report", element: BugReportPage}, //
        {path: "/bar/13rules_suchevskiy_val/events", element: BarCustomEventsPage, sections: [
                {id: "hero-section", title: "13 Правил хорошего вечера"},
                {id: "custom-event-types", title: "Виды мероприятий"},
                {id: "custom-event-formats", title: "Форматы мероприятий"},
                {id: "custom-event-offers", title: "Пакеты и спецпредложения"},
                {id: "offer-comparison-table", title: "Сравнение тарифов"},
                {id: "custom-event-cost-calculator-alt", title: "Калькулятор мероприятия"},
                {id: "custom-event-infrastructure", title: "Инфраструктура"},
                {id: "custom-event-reviews", title: "Отзывы"},
                {id: "custom-event-case-review", title: "Успешный кейс"},
                {id: "gallery", title: "Галерея"},
                {id: "faq", title: "Часто задаваемые вопросы"},
            ]},
        {path: "/documents/:alias", element: DocumentDetailPage, hideFooter: true}, // На ее примере посмотрю как изменить 100vh страницы
        {path: "*", element: NotFoundPage}, //
    ]
    const [hideFooter, setHideFooter] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const containerRef = useRef(null)

    const findRoute = (routes) =>
        routes.find(route => matchPath(route.path, location.pathname));

    const currentRoute = findRoute(anonymousPaths) || findRoute(paths);

    return (
    <>
        <div className="app" ref={containerRef} style={location.pathname === "/"? {backgroundImage: `url(${indexBubblesBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top'}: {}}>
            {!hideHeader && <Header paths={paths} sidePaths={headerSidePaths} scrollRef={containerRef} sections={currentRoute?.sections}/>}
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
