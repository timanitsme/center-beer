import './App.css'
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import bottlePath from "../src/assets/beer-bottle.svg"

function App() {
  return (
    <BrowserRouter>
        <div className="app">
            <Header/>
            <img className="bottle" src={bottlePath}></img>
            <div className="content">

                <div style={{height: "1000px"}}></div>
                <Footer/>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default App
