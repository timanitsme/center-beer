import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import BarPage from "./pages/BarPage/BarPage.jsx";
import BeerPage from "./pages/BeerPage/BeerPage.jsx";
import EventsPage from "./pages/EventsPage/EventsPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import BarsPage from "./pages/BarsPage/BarsPage.jsx";

function App() {
    const paths = [
        {title: "Пиво", path: "/beer", element: <BeerPage/>},
        {title: "Бары и магазины", path: "/", element: <BarsPage/>},
        {title: "Мероприятия", path: "/events", element: <EventsPage/>},
        {title: "О проекте", path: "/about-us", element: <AboutPage/>},
        {title: "Новости", path: "/news", element: <NewsPage/>},
        {title: "Контакты", path: "/contacts", element: <ContactsPage/>},
    ]
    const anonymousPaths = [
        {path: "/bar/:id", element: <BarPage/> },
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
