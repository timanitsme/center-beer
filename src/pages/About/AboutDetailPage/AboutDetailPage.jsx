import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import AboutDetailSection from "../../../components/AboutDetailSection/AboutDetailSection.jsx";
import {useNavigate, useParams} from "react-router-dom";
import EventsItem from "../../Events/EventsItem/EventsItem.jsx";
import PartnerItem from "../../../components/PartnerItem/PartnerItem.jsx";
import {
    FaBullhorn,
    FaChartLine,
    FaCreditCard, FaFileImage, FaGamepad,
    FaGlobe, FaLink,
    FaMoneyBillWave,
    FaTable,
    FaTag,
    FaTruck, FaUsers,
    FaVideo
} from "react-icons/fa6";
import {BsGear} from "react-icons/bs";
import {
    FaAd,
    FaBeer,
    FaBoxes,
    FaMapMarkerAlt,
    FaRegCalendarAlt,
    FaSearch,
    FaShareAlt,
    FaShoppingCart
} from "react-icons/fa";
import BreweryPartnerPreview from "../../../assets/partners/brewery-partner-preview.webp"
import BeerPartnerPreview from "../../../assets/partners/beer-partner-preview.webp"
import BeerDuck from "../../../assets/partners/beer-duck.webp"
import CenterAndBeer from "../../../assets/partners/center-and-beer.webp"
import BreweriesMeet from "../../../assets/partners/breweries-meet.webp"
import JawsIPA from "../../../assets/partners/jaws-ipa.webp"
import {MdRestaurantMenu} from "react-icons/md";
import {useEffect} from "react";
import AboutMobileSection from "../../../components/AboutMobileSection/AboutMobileSection.jsx";


export default function AboutDetailPage() {
    const navigate = useNavigate()
    const {alias} = useParams();
    const specs = {
        breweries: {
            sectionMenuItems: [
                {title: "Письмо пивоварням", path: "/documents/breweries-letter"},
                {title: "Конкурс Народная пивоварня", path: "/documents/cb-konkurs"},
                {title: "Чат для пивоварен", path: "https://t.me/+e2xLwW0fV2AxMmFi"},
                {title: "Заполнить анкету", path: "https://center.beer/contact-brew/"},
            ],
            paths: [
                {title: "Партнерам", path: "/about-us/"},
                {title: "Пивоварням"}
            ],
            partnerItems: [
                {Icon: FaGlobe, text: 'Стильный сайт с SEO оптимизацией'},
                {Icon: BsGear, text: 'Интуитивно понятное управление'},
                {Icon: FaSearch, text: 'Удобный поиск(фильтры) по пиву'},
                {Icon: FaVideo, text: 'Видео-визитки вашего пива'},
                {Icon: FaMapMarkerAlt, text: 'Все видят в онлайне где ваше пиво продаётся'},
                {Icon: FaBullhorn, text: 'О ваших мероприятиях узнает вся аудитория'},
                {Icon: FaChartLine, text: 'Увеличение продаж за счет доступности'},
                {Icon: FaBeer, text: 'Заказы напрямую из бара'},
                {Icon: FaShoppingCart, text: 'Дополнительные продажи через функцию предзаказа в заведениях'},
                {Icon: FaAd, text: 'Увеличение узнаваемости за счет рекламы'},
                {Icon: FaGamepad, text: 'Увеличение продаж за счет геймификации'},
                {Icon: FaShareAlt, text: 'Посты в соц. сетях из одного окна'},
            ],
            mainImage: BreweryPartnerPreview,
            videoCards: [
                {
                    title: "Встреча с пивоварнями",
                    preview: BreweriesMeet,
                    video: "https://vk.com/video_ext.php?oid=-210836529&id=456239047&hd=2&autoplay=1"
                },
                {
                    title: "Показываем инструменты",
                    preview: CenterAndBeer,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239031&hd=2&autoplay=1"
                },
                {
                    title: "Пример визитки пива",
                    preview: BeerDuck,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239046&hd=2&autoplay=1"
                },
                {
                    title: "Пример визитки пива",
                    preview: JawsIPA,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239027&hd=2&autoplay=1"
                },
            ],
            title: "Современный сайт, с простым управлением, который приводит клиентов из всех регионов и позволяет в реальном времени видеть где продается ваше пиво – это еще не все что мы предлагаем пивоварням",
            video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239049&hd=2&autoplay=1"
        },
        bars: {
            sectionMenuItems: [
                {title: "Письмо барам", path: "/documents/bars-letter"},
                {title: "Чат для владельцев баров", path: "https://t.me/+e2xLwW0fV2AxMmFi"},
                {title: "Заполнить анкету", path: "https://center.beer/contact-bar/"},
            ],
            paths: [
                {title: "Партнерам", path: "/about-us/"},
                {title: "Барам"}
            ],
            partnerItems: [
                {Icon: FaGlobe, text: 'Стильный сайт с SEO оптимизацией'},
                {Icon: BsGear, text: 'Интуитивно понятное управление'},
                {Icon: FaSearch, text: 'Удобный поиск(фильтры) по пиву'},
                {Icon: FaMapMarkerAlt, text: 'Повышение рейтинга на гео. сервисах'},
                {Icon: FaBeer, text: 'Все видят в онлайне, какое пиво у вас продаётся'},
                {Icon: FaRegCalendarAlt, text: 'Ваши мероприятия видит вся аудитория'},
                {Icon: FaTruck, text: 'Увеличение продаж за счет собственной доставки и предзаказа'},
                {Icon: FaShoppingCart, text: 'Доп. Продажи через функцию предзаказа'},
                {Icon: FaBullhorn, text: 'Увеличение узнаваемости за счет рекламы портала'},
                {Icon: MdRestaurantMenu, text: 'Автоматическое формирование меню на мониторах'},
                {Icon: FaTag, text: 'Автоматическое формирование ценников'},
                {Icon: FaTable, text: 'Система бронирования столов'},
                {Icon: FaShareAlt, text: 'Посты в соц. сетях из одного окна'},
                {Icon: FaCreditCard, text: 'Экономия на эквайринге'},
                {Icon: FaMoneyBillWave, text: 'Онлайн чаевые и оплаты'},
                {Icon: FaBoxes, text: 'Единая система заказов у дистрибьюторов'},
                {Icon: FaUsers, text: 'Оценка работы персонала'},
                {Icon: FaGamepad, text: 'Увеличение продаж за счет геймификации'},
                {Icon: FaFileImage, text: 'Макет тейбл-тента на свой тап-линк'},
                {Icon: FaLink, text: 'Простое создание фирменного тап-линка'},

            ],
            mainImage: BeerPartnerPreview,
            videoCards: [
                {
                    title: "Показываем инструменты",
                    preview: CenterAndBeer,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239031&hd=2&autoplay=1"
                },
                {
                    title: "Отзыв о работе",
                    preview: BeerDuck,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239046&hd=2&autoplay=1"
                },
                {
                    title: "Отзыв о работе",
                    preview: JawsIPA,
                    video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239027&hd=2&autoplay=1"
                },
            ],
            title: "Современный сайт, с автоматическим обновлением ассортимента, возможностью формирования заказа и бронирования столиков, который приводит клиентов и позволяет зарабатывать больше, делая меньше",
            video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239048&hd=2&autoplay=1"
        },
    }
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Партнерам", path: ""}
    ]

    useEffect(() => {
        document.title=`center.beer | Партнерам: ${specs[alias]?.paths[paths.length-1].title}`
    }, []);

    if (!specs?.hasOwnProperty(alias)) {
        navigate("/about-us")
    } else {
        return (
            <div className="content" style={{minHeight: "600px"}}>
                <NavChain paths={paths}/>
                <AboutMobileSection paths={specs[alias]?.sectionMenuItems}/>
                <AboutDetailSection paths={specs[alias]?.paths} sectionMenuItems={specs[alias]?.sectionMenuItems}
                                    cards={specs[alias]?.videoCards}>
                    <PartnerItem items={specs[alias]?.partnerItems} mainImage={specs[alias]?.mainImage}
                                 title={specs[alias]?.title} video={specs[alias]?.video} sideVideos={specs[alias]?.videoCards}/>
                </AboutDetailSection>

            </div>
        )
    }

}