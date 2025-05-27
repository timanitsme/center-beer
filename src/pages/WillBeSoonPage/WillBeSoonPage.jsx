import ChildrenTitle from "../../components/ChildrenTitle/ChildrenTitle.jsx";
import {FaTools} from "react-icons/fa";
import {useEffect} from "react";

export default function WillBeSoonPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "В разработке", path: ""},
    ]

    useEffect(() => {
        document.title = `center.beer | В разработке`
    }, []);

    return(<ChildrenTitle title="Скоро здесь появится актуальная информация о компании" paths={paths}><FaTools/></ChildrenTitle>)
}