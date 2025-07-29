import styles from "./PopularPosts.module.scss"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import PostImage1 from "../../assets/postsMocks/post-image-1.svg"
import PostImage2 from "../../assets/postsMocks/post-image-2.svg"
import PostImage3 from "../../assets/postsMocks/post-image-3.svg"
import PostImage4 from "../../assets/postsMocks/post-image-4.svg"
import PostCard from "../Cards/PostCard/PostCard.jsx";
import {useNavigate} from "react-router-dom";
import beerCatalogBg from "../../assets/bgPictures/beer-catalog-bg.webp";

export default function PopularPosts(){
    const postCards = [
        {title: "Стили крафтового пива", image: PostImage1, description: "Эль, лагер, портер. Если для вас эти слова звучат, как заклинание, скорее всего, вы только начинаете пробовать крафт и узнавать его историю. Давайте разберемся с основными типами пива и классификацией. После прочтения вы будете непринужденно общаться с любителями крафта и не краснеть при заказе очередной кружки напитка, боясь произнести название."},
        {title: "Хочешь свою пивоварню?", image: PostImage2, description: "Каждый решает сам, какой путь выбирать. Либо погрузиться в творческий процесс без больших обременений и довольствоваться готовыми условиям. Либо стать владельцем собственной пивоварни. Главное – любовь к своему продукту и желание удивлять."},
        {title: "Всё о пивных бокалах", image: PostImage3, description: "Не обязательно иметь на все 120 сортов по бокалу. В качестве основных точно найдете в старом серванте ноники или тумблеры. Не отказывайтесь от винных, коньячных и бокалов для шампанского. Они вполне могут заменить тюльпаны, кубки, чаши, снифтеры и подойдут для изысканных сортов пива."},
        {title: "Производство крафтового пива под запретом?", image: PostImage4, description: "Последние пару дней СМИ усиленно спекулируют на теме закрытия крафтовой ниши и дурят головы простым людям некорректной информацией. Меня уже засыпали сообщениями небезразличные клиенты, друзья и знакомые с просьбой прокомментировать ситуацию на пивном рынке или просто узнать, как мой бизнес будет жить дальше."}
    ]
    const navigate = useNavigate()

    return(
        <div className={styles.postsSection} style={{backgroundImage: `url(${beerCatalogBg})`, backgroundRepeat: 'no-repeat'}}>
            <div className={styles.postsHeader}>
                <h1 className="text-big">Популярные статьи</h1>
                <div className={styles.buttonContainer}><RoundLinkButton text="Все статьи" onClick={() => navigate("/news")}/></div>
            </div>
            <div className={styles.postsContainer}>
                {postCards.map((card, index) => {
                    return(<PostCard key={index} title={card.title} image={card.image} description={card.description}/>)
                })}

            </div>
        </div>
    )
}