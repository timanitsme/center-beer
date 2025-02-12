import './App.css'
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"
import NavChain from "./components/NavChain/NavChain.jsx";
import AdvantagesList from "./components/AdvantagesList/AdvantagesList.jsx";

function App() {
  return (
    <BrowserRouter>
        <div className="app">
            <Header/>
            <img className="bottle" src={bottlePath}></img>
            <div className="contentContainer">
                <div className="content">
                    <NavChain/>
                    <AdvantagesList></AdvantagesList>
                </div>
                <Footer/>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default App
