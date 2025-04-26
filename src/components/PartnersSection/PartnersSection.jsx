import styles from "./PartnersSection.module.css"
import PostImage1 from "../../assets/postsMocks/post-image-1.svg";
import PostImage2 from "../../assets/postsMocks/post-image-2.svg";
import PostImage3 from "../../assets/postsMocks/post-image-3.svg";
import PostImage4 from "../../assets/postsMocks/post-image-4.svg";
import {useNavigate} from "react-router-dom";
import PartnerCard from "../Cards/PartnerCard/PartnerCard.jsx";
import {FaPeopleGroup} from "react-icons/fa6";
import {FaTools} from "react-icons/fa";
import {PiMonitorFill} from "react-icons/pi";
import BarPartner from "../../assets/partners/bar-partner.webp"
import BreweryPartner from "../../assets/partners/brewery-partner.webp"
import DistributorPartner from "../../assets/partners/distributor-partner.webp"
import MusicianPartner from "../../assets/partners/musician-partner.webp"

export default function PartnersSection(){
    const postCards = [
        {title: "Заведениям", image: BarPartner, description: "Барам, ресторанам, кафе и магазинам"},
        {title: "Производителям", image: BreweryPartner, description: "Пивоварням, импортерам, владельцам брендов"},
        {title: "Дистрибьюторам", image: DistributorPartner, description: "Дистрибьюторам, мелким и крупным оптовикам"},
        {title: "Специалистам отрасли", image: MusicianPartner, description: "Музыкантам, ведущим, маркетологам, СММ специалистам, фуд фотографам и т.д."}
    ]
    const navigate = useNavigate()

    return(
        <div className={styles.partnersSection}>
            <p className={styles.active}>БИЗНЕС-ПАРТНЕРАМ</p>
            <div className={styles.descriptionRow}>
                <div className={styles.mainAdvantage}>
                    <h3 className={styles.header}>Развивайте бизнес с нами</h3>
                    <p>Мы понимаем тонкости отрасли, соединяем потребности одних, с возможностями других</p>
                </div>
                <div className={styles.advantagesRow}>
                    <div className={styles.advantage}>
                        <FaPeopleGroup/>
                        <p>Все ваши клиенты собраны на одном портале</p>
                    </div>
                    <div className={styles.advantage}>
                        <PiMonitorFill/>
                        <p>Стильный сайт с продуманным интерфейсом</p>
                    </div>
                    <div className={styles.advantage}>
                        <FaTools/>
                        <p>Элементарное управление страницей сайта</p>
                    </div>
                </div>

            </div>
            <div className={styles.postsSection}>
                <div className={styles.postsContainer}>
                    {postCards.map((card, index) => {
                        return(<PartnerCard key={index} title={card.title} image={card.image} description={card.description}/>)
                    })}

                </div>
            </div>
        </div>
    )
}