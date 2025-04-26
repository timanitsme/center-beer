import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import BarDetailPage from "./pages/BarDetailPage/BarDetailPage.jsx";
import BeerPage from "./pages/BeerPage/BeerPage.jsx";
import EventsPage from "./pages/Events/EventsPage/EventsPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import BarsPage from "./pages/BarsPage/BarsPage.jsx";
import BeerDetailPage from "./pages/BeerDetailPage/BeerDetailPage.jsx";
import BreweryDetailPage from "./pages/BreweryDetailPage/BreweryDetailPage.jsx";
import BreweryPage from "./pages/BreweryPage/BreweryPage.jsx";
import BeerMapPage from "./pages/BeerMapPage/BeerMapPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage.jsx";
import IndexPage from "./pages/IndexPage/IndexPage.jsx";
import DistributorsPage from "./pages/DistributorsPage/DistributorsPage.jsx";
import DistributorDetailPage from "./pages/DistributorDetailPage/DistributorDetailPage.jsx";
import PersonalAccountPage from "./pages/PersonalAccountPage/PersonalAccountPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage.jsx";
import RestorePasswordPage from "./pages/RestorePasswordPage/RestorePasswordPage.jsx";
import ErrorBoundary from "./utils/ErrorBoundary/ErrorBoundary.jsx";
import EventMapPage from "./pages/Events/EventMapPage/EventMapPage.jsx";
import {cloneElement, useState} from "react";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import RestaurantEventsPage from "./pages/Events/RestaurantEventsPage/RestaurantEventsPage.jsx";
import BreweryEventsPage from "./pages/Events/BreweryEventsPage/BreweryEventsPage.jsx";
import FestivalsPage from "./pages/Events/FestivalsPage/FestivalsPage.jsx";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop.jsx";

function App() {
    const paths = [
        {title: "Пиво", path: "/beer", element: <BeerPage/>},
        {title: "Бары и магазины", path: "/bars", element: <BarsPage/>, children: [
                {title: "Бары", path: "/bars"},
                {title: "Пивоварни", path: "/breweries"},
                {title: "Дистрибьюторы", path: "/distributors"},
                {title: "Карта баров", path: "/map"}
            ]},
        {title: "Мероприятия", path: "events", element: <EventsPage/>}, // /events
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
        {path: "/brewery/:id", element: <BreweryDetailPage/>},
        {path: "/news/:id", element: <NewsDetailPage/>},
        {path: "/map", element: <BeerMapPage/>},
        {path: "/distributor/:id", element: <DistributorDetailPage/>},
        {path: "/event-map/", element: <EventMapPage/>, hideFooter: true},
        {path: "/login/", element: <AuthorizationPage/>},
        {path: "/account/", element: <PersonalAccountPage/>},
        {path: "/signup/", element: <RegistrationPage/>},
        {path: "/cart/", element: <CartPage/>},
        {path: "/events/restaurants", element: <RestaurantEventsPage/>},
        {path: "/events/breweries", element: <BreweryEventsPage/>},
        {path: "/events/festivals", element: <FestivalsPage/>},
    ]
    const [hideFooter, setHideFooter] = useState(false);
    return (
    <BrowserRouter>
        <div className="app">
            <Header paths={paths}/>

            <div className="contentContainer">
                <Routes>
                    {paths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={<ErrorBoundary>{cloneElement(path.element, { setHideFooter })}</ErrorBoundary>}/>)
                    })}
                    {anonymousPaths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={<ErrorBoundary>{cloneElement(path.element, { setHideFooter })}</ErrorBoundary>}/>)
                    })}
                </Routes>
                {!hideFooter && <img className="bottle" src={bottlePath}></img>}
                {!hideFooter && <Footer />}
            </div>
        </div>
        <ScrollToTop/>
    </BrowserRouter>
  )
}

export default App
