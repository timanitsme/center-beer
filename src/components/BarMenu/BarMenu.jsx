import styles from "./BarMenu.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react"
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react"
import CoctailIcon from "../../assets/coctail-icon.svg?react"
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg?react"
import SausageIcon from "../../assets/sausage-icon.svg?react"
import ComboBox from "../ComboBox/ComboBox.jsx";
import CheckBox from "../CheckBox/CheckBox.jsx";
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react"
import FavIcon from "../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react"

export default function BarMenu(){
    const kitchenOptions = ["Австралийская", "Австрийская", "Авторская", "Азербайджанская", "Азиатская", "Американская"]
    const purposeOptions = ["Бизнес-ланч", "Весело напиться", "Девичник", "Деловая встреча", "Мальчишник", "Познакомиться"]
    const restaurantType = ["Банкетный зал", "Бар", "Бар-клуб", "Бургерная", "Винный бар", "Гастробар"]
    const featuresOptions = ["After-party", "DJ", "Dog-friendly", "Pre-party", "Wi-Fi", "Бильярд"]

    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <h2>Наше меню</h2>
                <div className={styles.filterButtons}>
                    <IconButton text="на кранах"><BeerTapIcon/></IconButton>
                    <IconButton text="фасованное пиво"><BeerCaseIcon/></IconButton>
                    <IconButton text="крепкий алкоголь"><AlcoBottleIcon/></IconButton>
                    <IconButton text="коктейли"><CoctailIcon/></IconButton>
                    <IconButton text="настойки"><AlcoBottleIcon/></IconButton>
                    <IconButton text="еда"><SausageIcon/></IconButton>
                </div>
            </div>
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    <ComboBox title="Кухня" options={kitchenOptions}/>
                    <ComboBox title="Цель посещения" options={purposeOptions}/>
                    <ComboBox title="Тип заведения" options={restaurantType}/>
                    <ComboBox title="Особенности" options={featuresOptions}/>
                </div>
                <div className={styles.menuItemsSections}>
                    <div className={styles.menuSection}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionDescriptionIcon}><BeerTapIcon/></div>
                            <div className={styles.sectionDescription}>
                                <h2>Сегодня и завтра у нас на кранах</h2>
                                <p>Мы предлагаем широкий ассортимент пива на кранах, чтобы удовлетворить самые разные вкусы и предпочтения наших гостей. От классических светлых элей до насыщенных янтарных и плотных пшеничных сортов — каждый найдет напиток по душе.</p>
                            </div>
                            <div className={styles.sectionButton}><IconButton text="Забронировать стол"><BeerTapIcon/></IconButton></div>
                        </div>
                        <div className={styles.sectionContent}>
                            <div className={styles.card}>
                                <div className={styles.draftBeerCard}>
                                    <div className={styles.cardTop}>
                                        <div>
                                            <p>APA</p>
                                            <p>13 RULES, Россия</p>
                                            <p>Стиль: APA</p>
                                        </div>
                                        <BookMarkIcon/>
                                    </div>
                                    <div className={styles.hrtLine}/>
                                    <div className={styles.characteristics}>
                                        <div>
                                            <p>Крепкость:</p>
                                            <p>4,5%</p>
                                        </div>
                                        <div>
                                            <p>Плотность:</p>
                                            <p>12%</p>
                                        </div>
                                        <div>
                                            <p>Горечь</p>
                                            <p>32</p>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.cardFooter}>
                                    <p>180₽</p>
                                    <IconButton text="Купить"><BottlesPairIcon/></IconButton>
                                    <FavIcon/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}