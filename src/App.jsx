import './App.css'
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import NavChain from "./components/NavChain/NavChain.jsx";
import AdvantagesList from "./components/AdvantagesList/AdvantagesList.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import CurrentPromos from "./components/CurrentPromos/CurrentPromos.jsx";

function App() {
  return (
    <BrowserRouter>
        <div className="app">
            <Header/>

            <div className="contentContainer">
                <div className="content">
                    <NavChain/>
                    <AdvantagesList/>
                    <Gallery/>
                    <CurrentPromos/>
                    <div style={{height: "200px"}}></div>
                </div>
                <img className="bottle" src={bottlePath}></img>
                <Footer/>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default App
