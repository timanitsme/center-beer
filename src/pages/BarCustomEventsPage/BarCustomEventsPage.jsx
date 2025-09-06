import {useEffect, useRef, useState} from "react";
import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import FAQ from "../../components/FAQ/FAQ.jsx";
import CustomEventReviews from "../../components/CustomEventReviews/CustomEventReviews.jsx";
import CustomEventTypes from "../../components/CustomEventTypes/CustomEventTypes.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import CustomEventFormats from "../../components/CustomEventFormats/CustomEventFormats.jsx";
import CustomEventCostCalculator from "../../components/CustomEventCostCalculator/CustomEventCostCalculator.jsx";
import CustomEventInfrastructure from "../../components/CustomEventInfrastructure/CustomEventInfrastructure.jsx";
import PromotionCombinationRules from "../../components/PromotionsCombinationRules/PromotionCombinationRules.jsx";
import CustomEventRequestForm from "../../components/CustomEventRequestForm/CustomEventRequestForm.jsx";
import CustomEventOffers from "../../components/CustomEventOffers/CustomEventOffers.jsx";
import BirthdayCakeIcon from "../../assets/birthday-icon.svg?react"
import {BsPeopleFill} from "react-icons/bs";
import {GiPartyPopper} from "react-icons/gi";
import {FaGift} from "react-icons/fa6";
import {PiSoccerBallFill} from "react-icons/pi";
import {MdOutlineStars} from "react-icons/md";
import Cake from "../../assets/customEventsPictures/cake.webp";
import Business from "../../assets/customEventsPictures/business.webp";
import BoardGames from "../../assets/customEventsPictures/board-games.webp";
import Sport from "../../assets/customEventsPictures/sport.webp";
import ReviewMock from "../../assets/customEventMocks/review-mock.png"
import DatePicker from "../../components/DatePicker/DatePicker.jsx";


export default function BarCustomEventsPage(){
    const paths = [
        /*{title: "center.beer", path: "/"},
        {title: "Бары и магазины", path: ""},*/
        {title: "13 RULES (Народный бар)", path: "/bar/13rules_suchevskiy_val"},
        {title: "Мероприятия", path: ""},

    ]

    const calculatorRef = useRef(null)
    const orderRef = useRef(null)

    const gallery = [
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-1.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-2.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-3.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-4.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-5.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-6.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-7.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-8.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-9.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-10.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-11.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-12.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-13.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-14.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-15.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-16.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-17.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-18.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-19.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-20.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-21.jpg"
    ]

    const offerCards = [
        { Icon: BirthdayCakeIcon, title: "День Рождения в 13 Rules", price: "ОТ 20 000 ₽", badge: {oldPrice: true, content: "45 000 ₽"}, characteristics: [
            <><b>Push-сертификат на 7 дней:</b><li>до 10 гостей — <b>3 000 ₽</b>,</li><li>11–20 гостей — <b>5 000 ₽</b>,</li><li>21 и более — <b>10 000 ₽</b></li></>,
            <>Подарок имениннику: <b>фирменный бургер + сет дегустации пива</b></>, <>Для компании именинника: <b>–10% на меню</b></>,],
        disclaimer: <><i>Работает как одиночный пакет. С сертификатом не совмещаем «Всё включено»</i></>},
        { Icon: BsPeopleFill, title: "Корпоративный пакет", price: "ОТ 20 000 ₽", badge: {oldPrice: true, content: "45 000 ₽"}, characteristics: [
            <>Полная/частичная аренда (до 50 чел)</>, <><b>welcome-drink</b> всем</>,
            <><b>–10% меню</b></>, <><b>Условие активации выгоды:</b> будни и/или депозит/аренда от <b>100 000 ₽</b></>,
            <><b>Бонус:</b> экран/флипчарт с подключением — <b>бесплатно</b></>]},
        { Icon: GiPartyPopper, title: "Мальчишник/Девичник", price: "ОТ 20 000 ₽", badge: {oldPrice: true, content: "45 000 ₽"}, characteristics: [
            <>Первый кег пива или сет шотов — бесплатно</>,
            <>Пакет «Закуски XL» по специальной цене (бургеры + снеки)</>,
            <>Диджей/караоке с <b>–30%</b></>]},
        { Icon: PiSoccerBallFill, title: "Большой матч", price: "ОТ 20 000 ₽", badge: {oldPrice: true, content: "45 000 ₽"}, characteristics: [
            <>Полная или частичная аренда</>,
            <><b>–20%</b> на закуски к матчу</>,
            <><b>Комбо-наборы «Пиво + закуски»</b> (пример меню): <li>«Хэт-трик» (3 пива 0,5 + крылья + картофель) — <b>1 990 ₽</b></li><li>«Дубль» (2 пива 0,5 + начос + сырные палочки) — <b>1 290 ₽</b></li><li>«Капитан» (4 пива 0,5 + бургер-мини 4 шт + кольца) — <b>2 790 ₽</b></li></>]},
        { Icon: MdOutlineStars, title: "Все включено", price: "100 000 ₽", badge: {benefit: true, content: "Выгода 30 000 ₽"}, characteristics: [
            <>Полная аренда</>,
            <>Ведущий</>,
            <>диджей</>,
                <>Welcome-drink</>,
                <>Комбо-наборы</>,
                <>Декор</>,
                <>Фото/видео</>
            ]},
        { Icon: FaGift, title: "Дополнительные механики", price: "ОТ 20 000 ₽", badge: {oldPrice: true, content: "45 000 ₽"}, characteristics: [
            <><b>Happy Birthday Week:</b> в течение 7 дней после ДР — <b>–20%</b> на весь стол (ре-визит)</>,
            <><b>Afterwork Party (будни с 18:00):</b> первый сет закусок — бесплатно</>,
            <><b>Weekend Special:</b> аренда в Сб/Вс — пакет «Пиво + закуски» <b>–20%</b></>,
            <><b>Карта «Организатор»:</b> за 2+ мероприятий — сертификат 5 000 ₽</>
            ]},

    ]

    const questions = [
        {question: "Можно ли со своими тортами/фото-зоной?", answer: "Да, согласуем"},
        {question: "Сколько длится аренда?", answer: "Стандарт 4 часа, +1 час по прайсу"},
        {question: "Шум/соседи?", answer: "Звуковые ограничения соблюдаем, музыка допустима"},
        {question: "Можно детское мероприятие?", answer: "Обсудим формат и меню"},
        {question: "Есть ли возрастные ограничения", answer: "Возраст 18+ для алкогольных мероприятий"},
        {question: "Фото/видео-съёмка?", answer: "Да, согласуем"}
    ]

    useEffect(() => {
        document.title = ""
    }, []);

    const formats = [
        {title: "Частные праздники", singular: "Частный праздник", description: "День рождения, Юбилей, Мальчишник/Девичник, Afterparty", image: Cake, onClick: () => {}},
        {title: "Бизнес-мероприятия", singular: "Бизнес-мероприятие", description: "Корпоратив, Тимбилдинг, Презентации, Встречи предпринимателей", image: Business, onClick: () => {}},
        {title: "Тематические мероприятия", singular: "Тематическое мероприятие", description: "Крафтовые дегустации, Квиз, Stand-up, Караоке-батл, Музыкальный батл, Джем/«квартирник», Трибьют-вечера, Настолки/Мафия/PS4/5, Beer-pong", image: BoardGames, onClick: () => {}},
        {title: "Спорт", singular: "Спортивное мероприятие", description: "Футбол, хоккей, UFC — смотрите любимые события на большом экране с друзьями и холодным пивом", image: Sport, onClick: () => {}},
    ]

    const [selectedFormat, setSelectedFormat] = useState(null)

    const reviews = [
        {id: 0, picture: ReviewMock, rating: 4.5, author: "Сергей К.", comment: "Это именно бар, а не паб. Душевное место, небольшое, человек на 40-50. Хороший выбор пива и настоек. Еда - барное меню. Готовят чаще вкусно, чем нет. Прекрасные рёбрышки и пивные тарелки. Отличное место для встречи с друзьями. В выходные живая музыка - разная, но обычно бывает весело"},
        {id: 1, picture: ReviewMock, rating: 5, author: "", comment: ""},
        {id: 2, picture: ReviewMock, rating: 5, author: "", comment: ""},
        {id: 3, picture: ReviewMock, rating: 5, author: "", comment: ""},
    ]


    return(
        <div className="content">
            <HeroSection calculatorRef={calculatorRef} orderRef={orderRef}/>
            <NavChain paths={paths}></NavChain>
            <CustomEventTypes cards={formats} orderRef={orderRef}/>
            <CustomEventFormats/>
            <PromotionCombinationRules/>
            <CustomEventOffers cards={offerCards}/>
            <CustomEventCostCalculator calculatorRef={calculatorRef}/>
            <CustomEventRequestForm orderRef={orderRef}/>
            <CustomEventInfrastructure/>
            <CustomEventReviews reviews={reviews}/>
            <Gallery pictures={gallery}></Gallery>
            <FAQ questions={questions}/>
        </div>
    )
}