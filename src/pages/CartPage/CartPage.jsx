import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import CartSection from "../../components/CartSection/CartSection.jsx";


export default function CartPage(){
    const paths = [
        {title: "beer.center", path: "/"},
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