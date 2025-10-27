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
import CustomEventReview1 from "../../assets/customEventReviews/event-review-1.webp"
import CustomEventReview2 from "../../assets/customEventReviews/event-review-2.webp"
import CustomEventReview3 from "../../assets/customEventReviews/event-review-3.webp"
import CustomEventReview4 from "../../assets/customEventReviews/event-review-4.webp"
import CustomEventReview5 from "../../assets/customEventReviews/event-review-5.webp"
import CustomEventsStickyButtons from "../../components/CustomEventsStickyButtons/CustomEventsStickyButtons.jsx";
import CustomEventCostCalculatorAlt
    from "../../components/CustomEventCostCalculatorAlt/CustomEventCostCalculatorAlt.jsx";
import CustomEventRequestOverlay from "../../components/CustomEventRequestOverlay/CustomEventRequestOverlay.jsx";
import Gallery1 from "../../assets/customEventGallery/gallery-1.webp"
import Gallery2 from "../../assets/customEventGallery/gallery-2.webp"
import Gallery3 from "../../assets/customEventGallery/gallery-3.webp"
import Gallery4 from "../../assets/customEventGallery/gallery-4.webp"
import Gallery5 from "../../assets/customEventGallery/gallery-5.webp"
import Gallery6 from "../../assets/customEventGallery/gallery-6.webp"
import Gallery7 from "../../assets/customEventGallery/gallery-7.webp"
import Gallery8 from "../../assets/customEventGallery/gallery-8.webp"
import Gallery9 from "../../assets/customEventGallery/gallery-9.webp"
import Gallery10 from "../../assets/customEventGallery/gallery-10.webp"
import Gallery11 from "../../assets/customEventGallery/gallery-11.webp"
import Gallery12 from "../../assets/customEventGallery/gallery-12.webp"
import Gallery13 from "../../assets/customEventGallery/gallery-13.webp"
import Gallery14 from "../../assets/customEventGallery/gallery-14.webp"
import Gallery15 from "../../assets/customEventGallery/gallery-15.webp"
import OfferComparisonTable from "../../components/OfferComparisonTable/OfferComparisonTable.jsx";
import CustomEventCaseReview from "../../components/CustomEventCaseReview/CustomEventCaseReview.jsx";


export default function BarCustomEventsPage(){
    const paths = [
        /*{title: "center.beer", path: "/"},
        {title: "Бары и магазины", path: ""},*/
        {title: "13 RULES", path: "/bar/13rules_suchevskiy_val"},
        {title: "Мероприятия", path: ""},

    ]

    const calculatorRef = useRef(null)
    const orderRef = useRef(null)

    const heroRef = useRef(null)
    const [isHeroVisible, setIsHeroVisible] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    const gallery = [
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-1.jpg",
        Gallery1,
        Gallery2,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-3.jpg",
        Gallery3,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-4.jpg",
        Gallery4,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-5.jpg",
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-6.jpg",
        Gallery6,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-7.jpg",
        Gallery7,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-8.jpg",
        Gallery8,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-9.jpg",
        Gallery9,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-10.jpg",
        Gallery10,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-11.jpg",
        Gallery11,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-12.jpg",
        Gallery12,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-13.jpg",
        Gallery13,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-14.jpg",
        Gallery14,
        "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-15.jpg",
        Gallery15,
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
            <>Первый сет шотов или пива — бесплатно</>,
            <>Пакет «Закуски XL» по специальной цене (бургеры + снеки)</>]},
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
            <><b>Happy Birthday Week:</b> в течение 7 дней после ДР <b>–20%</b> на бар при повторном визите</>,
            <><b>Afterwork Party (будни с 18:00):</b> первый сет закусок — бесплатно</>,
            <><b>Weekend Special:</b> аренда в Сб/Вс — пакет «Пиво + закуски» <b>–20%</b></>,
            <><b>Карта «Организатор»:</b> за 2+ мероприятий — сертификат 5 000 ₽</>
            ]},

    ]

    const questions = [
        {question: "Можно ли со своими тортами/фото-зоной?", answer: "Да, вы можете привезти свои торты или организовать фото-зону. Мы всегда готовы помочь с согласованием деталей, чтобы всё прошло идеально."},
        {question: "Сколько длится аренда?", answer: "Стандартное время аренды составляет 4 часа. Если вам нужно больше времени, каждый дополнительный час оплачивается согласно прайсу. Уточните детали у менеджера."},
        {question: "Шум/соседи?", answer: "Мы соблюдаем звуковые ограничения, установленные для комфортного сосуществования с соседями. Музыка допустима до определённого уровня громкости, который мы оговариваем заранее. "},
        {question: "Можно детское мероприятие?", answer: "Да, мы можем организовать детское мероприятие. Давайте обсудим формат, количество участников и составим подходящее меню для ваших гостей."},
        {question: "Есть ли возрастные ограничения", answer: "Для мероприятий с алкоголем действует возрастное ограничение 18+. Для других типов мероприятий ограничений нет, если это не противоречит формату."},
        {question: "Фото/видео-съёмка?", answer: "Да, фото- и видеосъемка разрешена. Мы можем предоставить рекомендации по расположению оборудования или помочь с планировкой пространства для съемки. Согласуем все детали заранее."},
        {question: "Есть ли предоплата?", answer: "Да, при бронировании мероприятия вносится 30% предоплата"}
    ]

    useEffect(() => {
        document.title = ""
    }, []);

    const types = [
        {title: "Частные праздники", singular: "Частный праздник", promo: "Сертификат и подарки", description: "День рождения, Юбилей, Мальчишник, Девичник, Afterparty", image: Cake, onClick: () => {}},
        {title: "Бизнес-мероприятия", singular: "Бизнес-мероприятие", promo: "Пивная кега по себестоимости", description: "Корпоратив, Тимбилдинг, Презентации, Встречи предпринимателей", image: Business, onClick: () => {}},
        {title: "Тематические мероприятия", singular: "Тематическое мероприятие", promo: "Открытое мероприятие или закрытое с входом по билетам", description: "Крафтовые дегустации, Квиз, Stand-up, Караоке-батл, Музыкальный батл, Джем, «квартирник», Трибьют-вечера, Настолки, Мафия, PS4, PS5, Beer-pong", image: BoardGames, onClick: () => {}},
        {title: "Спорт", singular: "Спортивное мероприятие", promo: "Выигрыла ваша команда - шоты в подарок", description: "Футбол, хоккей, UFC — смотрите любимые события на большом экране с друзьями и холодным пивом", image: Sport, onClick: () => {}},
    ]

    const [selectedFormat, setSelectedFormat] = useState(null)
    const [requestOverlayExpanded, setRequestOverlayExpanded] = useState(false)

    const reviews = [
        {id: 0, picture: CustomEventReview1, rating: 5, author: "Сергей К.", comment: "Бар с живой музыкой, есть гитара и дартс, это была приятная пятница после работы. Кухня класс, мясные стрипсы, крутые блюда в кляре. Есть бонусно-скидочная система. Рекомендую!"},
        {id: 1, picture: CustomEventReview2, rating: 5, author: "Анна П.", comment: "Это именно бар, а не паб. Душевное место, небольшое, человек на 40-50. Хороший выбор пива и настоек. Еда - барное меню. Готовят чаще вкусно, чем нет. Прекрасные рёбрышки и пивные тарелки. Отличное место для встречи с друзьями. В выходные живая музыка - разная, но обычно бывает весело"},
        {id: 2, picture: CustomEventReview3, rating: 5, author: "Дмитрий М.", comment: "Попали сюда за призом, выигранным в телеге. Все очень классно! Уютно, вкусно, кто-то постоянно у микрофона даёт фон. Нам понравилось! Бармен Полина-просто солнце! Молодцы! Так держать!!!"},
        {id: 3, picture: CustomEventReview4, rating: 5, author: "Екатерина С.", comment: "Классный бар для небольших вечерних посиделок с друзьями, вкусная еда, неплохой выбор напитков, которые делают с душой и качественно, а также за приемлимый ценник. Даже есть активности с живым выступлением, которые отлично дополняют атмосферу. Очень рекомендую!"},
        {id: 4, picture: CustomEventReview5, rating: 5, author: "Александр Т.", comment: "Хорошее место, чтобы просто попить пиво и заесть всякими закусками. Можно прийти и поиграть в настолки или просто игры в дни игротек, можно просто послушать авторскую музыку или классику дворов (Батарейка, Летова, Кино и.т.д, даже Гайка Борзова). Крайне рекомендую"},
    ]


    return(
        <div className="content">
            <CustomEventsStickyButtons isVisible={isHeroVisible} calculatorRef={calculatorRef} requestOverlay={requestOverlayExpanded} setRequestOverlay={setRequestOverlayExpanded}></CustomEventsStickyButtons>
            <HeroSection calculatorRef={calculatorRef} setRequestOverlay={setRequestOverlayExpanded} heroRef={heroRef}/>
            <NavChain paths={paths}></NavChain>
            <CustomEventTypes cards={types} orderRef={orderRef} setRequestOverlay={setRequestOverlayExpanded}/>
            <CustomEventFormats/>
            <CustomEventOffers cards={offerCards}/>
            <OfferComparisonTable/>
            <CustomEventCostCalculatorAlt calculatorRef={calculatorRef} setIsExpanded={setRequestOverlayExpanded}/>
            <CustomEventInfrastructure/>
            <CustomEventReviews reviews={reviews}/>
            <CustomEventCaseReview/>
            <Gallery pictures={gallery}></Gallery>
            <FAQ questions={questions}/>
            <CustomEventRequestOverlay isExpanded={requestOverlayExpanded} setIsExpanded={setRequestOverlayExpanded}/>
        </div>
    )
}