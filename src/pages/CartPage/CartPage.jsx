import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import CartSection from "../../components/CartSection/CartSection.jsx";
import {useEffect} from "react";


export default function CartPage(){
    useEffect(() => {
        document.title = `center.beer | Корзина`
    }, []);

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Мой профиль", path: "/"},
        {title: "Корзина", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <CartSection/>
        </div>
    )
}