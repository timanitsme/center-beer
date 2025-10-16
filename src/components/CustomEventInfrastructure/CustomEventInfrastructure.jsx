import styles from "./CustomEventInfrastructure.module.scss"
import Infrastructure from "../../assets/infrastructure.svg?react"
import InfrastructureMobile from "../../assets/infra-mobile-alt-1.svg?react"
import {useState} from "react";
import CloseIcon from "../../assets/close-icon.svg?react"
import Media1 from "../../assets/customEventsPictures/media-1.webp"
import Media2 from "../../assets/customEventsPictures/media-2.webp"
import Media3 from "../../assets/customEventsPictures/media-3.webp"
import Bar1 from "../../assets/customEventsPictures/bar-1.webp"
import Bar2 from "../../assets/customEventsPictures/bar-2.webp"
import Bar3 from "../../assets/customEventsPictures/bar-3.webp"
import Board1 from "../../assets/customEventsPictures/board-1.webp"
import Board2 from "../../assets/customEventsPictures/board-2.webp"
import Kitchen1 from "../../assets/customEventsPictures/kitchen-1.webp"
import Kitchen2 from "../../assets/customEventsPictures/kitchen-2.webp"
import Kitchen3 from "../../assets/customEventsPictures/kitchen-3.webp"
import TvIcon from "../../assets/lucide/tv-lucide-icon.svg?react"
import SpeakerIcon from "../../assets/lucide/speaker-lucide-icon.svg?react"
import MicIcon from "../../assets/lucide/mic-lucide-icon.svg?react"
import GuitarIcon from "../../assets/lucide/guitar-lucide-icon.svg?react"
import SingleImageModal from "../Modals/SingleImageModal/SingleImageModal.jsx";
import placeholder from "../../assets/placeholders/card-image-placeholder.svg"
import BeerIcon from "../../assets/lucide/beer-lucide-icon.svg?react"
import ChefIcon from "../../assets/lucide/chef-lucide-icon.svg?react"
import DicesIcon from "../../assets/lucide/dices-lucide-icon.svg?react"

export default function CustomEventInfrastructure(){
    const [currentTab, setCurrentTab] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(placeholder);


    const tabs = {
        "media": <div className={styles.tabContent}>
            <div className={styles.description}>
                <h3 className="ma-h3">Мультимедиа</h3>
                <p className="ma-p">Профессиональное звуковое и визуальное оборудование для трансляций матчей, презентаций и живых выступлений.</p>
                <div className={styles.characteristics}>
                    <div className={styles.characteristic}><TvIcon/><p className="ma-p">4 больших экрана</p></div>
                    <div className={styles.characteristic}><SpeakerIcon/><p className="ma-p">Музыкальный пульт</p></div>
                    <div className={styles.characteristic}><MicIcon/><p className="ma-p">2 микрофона</p></div>
                    <div className={styles.characteristic}><GuitarIcon/><p className="ma-p">2 электро-акустические гитары</p></div>
                </div>

            </div>
            <div className={styles.pictures}>
                <img src={Media1} onClick={() => {setCurrentImage(Media1); setShowModal(true)}} alt=""/>
                <img src={Media2} onClick={() => {setCurrentImage(Media2); setShowModal(true)}} alt=""/>
                <img src={Media3} onClick={() => {setCurrentImage(Media3); setShowModal(true)}} alt=""/>
            </div>

        </div>,
        "bar": <div className={styles.tabContent}>
            <div className={styles.description}>
                <h3 className="ma-h3">Бар</h3>
                <p className="ma-p">Широкий выбор крафтового пива, авторских коктейлей и домашних настоек для любых предпочтений гостей</p>
                <div className={styles.characteristics}>
                    <div className={styles.characteristic}><BeerIcon/><p className="ma-p">Крафтовое пиво</p></div>
                    <div className={styles.characteristic}><BeerIcon/><p className="ma-p">Авторские коктейли</p></div>
                    <div className={styles.characteristic}><BeerIcon/><p className="ma-p">Домашние настойки</p></div>
                    <div className={styles.characteristic}><BeerIcon/><p className="ma-p">Безалкогольные напитки</p></div>
                </div>

            </div>
            <div className={styles.pictures}>
                <img src={Bar1} onClick={() => {setCurrentImage(Bar1); setShowModal(true)}} alt=""/>
                <img src={Bar2} onClick={() => {setCurrentImage(Bar2); setShowModal(true)}} alt=""/>
                <img src={Bar3} onClick={() => {setCurrentImage(Bar3); setShowModal(true)}} alt=""/>
            </div>

        </div>,
        "kitchen": <div className={styles.tabContent}>
            <div className={styles.description}>
                <h3 className="ma-h3">Кухня</h3>
                <p className="ma-p">Собственная кухня с фирменными бургерами, снеками и закусками, идеально дополняющими атмосферу бара</p>
                <div className={styles.characteristics}>
                    <div className={styles.characteristic}><ChefIcon/><p className="ma-p">Фирменные бургеры</p></div>
                    <div className={styles.characteristic}><ChefIcon/><p className="ma-p">Закуски к пиву</p></div>
                    <div className={styles.characteristic}><ChefIcon/><p className="ma-p">Снеки и фри</p></div>
                    <div className={styles.characteristic}><ChefIcon/><p className="ma-p">Мясо</p></div>
                </div>

            </div>
            <div className={styles.pictures}>
                <img src={Kitchen1} onClick={() => {setCurrentImage(Kitchen1); setShowModal(true)}} alt=""/>
                <img src={Kitchen2} onClick={() => {setCurrentImage(Kitchen2); setShowModal(true)}} alt=""/>
                <img src={Kitchen3} onClick={() => {setCurrentImage(Kitchen3); setShowModal(true)}} alt=""/>
            </div>

        </div>,
        "board": <div className={styles.tabContent}>
            <div className={styles.description}>
                <h3 className="ma-h3" >Настольные игры</h3>
                <p className="ma-p">Коллекция настольных игр для развлечения гостей и создания непринужденной атмосферы общения</p>
                <div className={styles.characteristics}>
                    <div className={styles.characteristic}><DicesIcon/><p className="ma-p">20+ настольных игр</p></div>
                    <div className={styles.characteristic}><DicesIcon/><p className="ma-p">Стратегии и вечериночные игры</p></div>
                    <div className={styles.characteristic}><DicesIcon/><p className="ma-p">Игры для компаний от 2 до 10 человек</p></div>
                </div>

            </div>
            <div className={styles.pictures}>
                <img src={Board1} onClick={() => {setCurrentImage(Board1); setShowModal(true)}} alt=""/>
                <img src={Board2} onClick={() => {setCurrentImage(Board2); setShowModal(true)}} alt=""/>
                <img src="https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-11.jpg" onClick={() => {setCurrentImage("https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-11.jpg" ); setShowModal(true)}} alt=""/>
            </div>

        </div>,


    }

    return(
        <section className={styles.infrastructureSection}>
            <div className={styles.defaultInfrastructure}><Infrastructure/></div>
            <div className={styles.kitchen} onClick={() => setCurrentTab("kitchen")}>
                <div className={styles.flare}></div>
            </div>
            <div className={styles.media} onClick={() => setCurrentTab("media")}>
                <div className={styles.flare}></div>
            </div>
            <div className={styles.board} onClick={() => setCurrentTab("board")}>
                <div className={styles.flare}></div>
            </div>
            <div className={styles.bar} onClick={() => setCurrentTab("bar")}>
                <div className={styles.flare}></div>
            </div>
            <div className={`${styles.currentTab} ${currentTab !== ""? styles.visible: ""}`}>
                {tabs[currentTab]}
                <div className={styles.closeButton} onClick={() => setCurrentTab("")}>
                    <CloseIcon/>
                </div>
                <SingleImageModal show={showModal} setSrc={setCurrentImage} setShow={setShowModal} src={currentImage}></SingleImageModal>
            </div>
            <div className={styles.mobileInfrastructure}>
                <InfrastructureMobile/>
            </div>
        </section>
    )
}