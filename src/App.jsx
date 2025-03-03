import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import BarDetailPage from "./pages/BarDetailPage/BarDetailPage.jsx";
import BeerPage from "./pages/BeerPage/BeerPage.jsx";
import EventsPage from "./pages/EventsPage/EventsPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import BarsPage from "./pages/BarsPage/BarsPage.jsx";
import BeerDetailPage from "./pages/BeerDetailPage/BeerDetailPage.jsx";
import BreweryDetailPage from "./pages/BreweryDetailPage/BreweryDetailPage.jsx";
import BreweryPage from "./pages/BreweryPage/BreweryPage.jsx";
import BeerMapPage from "./pages/BeerMapPage/BeerMapPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage.jsx";

function App() {
    const paths = [
        {title: "Пиво", path: "/beer", element: <BeerPage/>},
        {title: "Бары и магазины", path: "/", element: <BarsPage/>, children: [
                {title: "Бары", path: "/"},
                {title: "Пивоварни", path: "/breweries"},
                {title: "Карта баров", path: "/map"}
            ]},
        {title: "Мероприятия", path: "/events", element: <EventsPage/>},
        {title: "О проекте", path: "/about-us", element: <AboutPage/>},
        {title: "Новости", path: "/news", element: <NewsDetailPage/>},
        {title: "Контакты", path: "/contacts", element: <ContactsPage/>},
    ]
    const anonymousPaths = [
        {path: "/breweries", element: <BreweryPage/>},
        {path: "/bar/:id", element: <BarDetailPage/> },
        {path: "/beer/:id", element: <BeerDetailPage/>},
        {path: "/brewery/:id", element: <BreweryDetailPage/>},
        {path: "/map", element: <BeerMapPage/>}
    ]

    return (
    <BrowserRouter>
        <div className="app">
            <Header paths={paths}/>

            <div className="contentContainer">
                <Routes>
                    {paths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={path.element}/>)
                    })}
                    {anonymousPaths.map((path) => {
                        return(<Route key={path.path} path={path.path} element={path.element}/>)
                    })}
                </Routes>
                <img className="bottle" src={bottlePath}></img>
                <Footer/>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default App
