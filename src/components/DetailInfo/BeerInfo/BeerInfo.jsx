import styles from "./BeerInfo.module.scss"
import {useEffect, useState} from "react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import CommentIcon from "../../../assets/comment-icon.svg?react";
import CheckInIcon from "../../../assets/check-in-icon.svg?react"
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react"
import HopIcon from "../../../assets/hop-icon.svg?react"
import PlayButtonIcon from "../../../assets/play-button-icon.svg?react"
import ImageVideoModal from "../../Modals/ImageVideoModal/ImageVideoModal.jsx";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";
import {Link} from "react-router-dom";
import {useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery} from "../../../store/services/centerBeer.js";

export default function BeerInfo({showPrice=false,beerInfo={}}){
    const [isFavourite, setIsFavourite] = useState(beerInfo?.is_favor || false);
    const [isBookmarked, setIsBookmarked] = useState(beerInfo?.is_liked || false);

    const [selectedPicture, setSelectedPicture] = useState(beerInfo?.gallery[0])
    const [showModal ,setShowModal] = useState(false)
    const formatNumber = (num) => Number(num).toString()
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBeerToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBeerToFavQuery();

    const handleAddToCuddy = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToCuddy(id).unwrap();
            setIsBookmarked(!isBookmarked)
        } catch (err) {
            console.log(`add to cuddy error: ${err}`)
        }
    }

    const handleAddToFav = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToFav(id).unwrap();
            setIsFavourite(!isFavourite)
        } catch (err) {
            console.log(`add to fav error: ${err}`)
        }
    }

    useEffect(() => {
        if (beerInfo?.gallery && beerInfo.gallery.length > 0) {
            setSelectedPicture(beerInfo.gallery[0]);
        } else {
            setSelectedPicture(null);
        }
    }, [beerInfo]);

    return(
        <div id="beer-info">
            <div className={styles.barInfoContainer}>
                <div className={styles.beerPictures}>
                    <div className={styles.picturesColumn}>
                        {beerInfo?.gallery.map((picture, index) =>(
                            <div key={index} onClick={() => setSelectedPicture(picture)} className={`${picture === selectedPicture? styles.selected : ""} ${styles.sidePictureContainer}`}>
                                {picture?.type === "video" && <PlayButtonIcon/>}
                                <img src={picture?.preview} alt=""/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.selectedPictureContainer} onClick={() => setShowModal(true)}>
                        {selectedPicture?.type === "video" && <PlayButtonIcon/>}
                        <img src={selectedPicture.preview} alt=""/>
                    </div>
                </div>

                <div style={{width: "100%"}}>
                    <div className={styles.flexRow}>
                        <h2 className={`${styles.beerTitle} ma-h2`}>{beerInfo?.name}</h2>
                        <div>
                            <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={(e) => handleAddToFav(e, beerInfo?.id)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                            <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={(e) => handleAddToCuddy(e, beerInfo?.id)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                        </div>
                    </div>
                    <div className={styles.beerInfoContainer}>
                        <div className={styles.barDescription}>

                            <div className={styles.characteristics}>
                                <div className={styles.characteristic}>
                                    <HopIcon/>
                                    <p className="ma-p">Крепость: <span style={{color: "var(--txt-primary)"}} className="ma-p">{formatNumber(beerInfo?.abv || "0")}%</span></p>
                                </div>
                                <div className={styles.characteristic}>
                                    <HopIcon/>
                                    <p className="ma-p">Плотность: <span style={{color: "var(--txt-primary)"}} className="ma-p">{formatNumber(beerInfo?.og || '0')}%</span></p>
                                </div>
                                <div className={styles.characteristic}>
                                    <HopIcon/>
                                    <p className="ma-p">Горечь: <span className="ma-p" style={{color: "var(--txt-primary)"}}>{formatNumber(beerInfo?.ibu || '0')}</span></p>
                                </div>
                            </div>
                            <p className={styles.notMobile}>{beerInfo?.description}</p>
                            <div className={styles.notMobile}>
                                <ul className={styles.characteristicsList}>
                                    <li><p>Пивоварня: <Link to={`/brewery/${beerInfo?.brewery_alias}`}>{beerInfo?.brewery_name}</Link></p></li>
                                    <li><p>Стиль: <a href="">{beerInfo?.style_name}</a></p></li>
                                    <li><p>Начало выпуска: <p style={{color: "var(--txt-active)"}}>{beerInfo?.start_date_sales}</p></p></li>
                                    <li><p>Производство: <p style={{color: "var(--txt-active)"}}>{beerInfo?.production}</p></p></li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${styles.barInfo} ${styles.regular}`}>
                            <div className={styles.ratingAndComments}>
                                <div className={styles.beerBottles}>
                                    {getRatingIcons(beerInfo?.rating)}
                                </div>
                                <p>({beerInfo?.rating})</p>
                                <div className={styles.circle}/>
                                <a> <CommentIcon/> 116 комментариев</a>
                            </div>
                            <IconButton text="добавить check-in" style="secondary"><CheckInIcon/></IconButton>
                            { showPrice &&
                                <div className={styles.cartAndPrice}>
                                    <h2 style={{color: "var(--primary)"}}>380₽</h2>
                                    <IconButton text="Добавить в корзину" style="primary"><BottlesPairIcon/></IconButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${styles.barInfo} ${styles.mobile}`}>
                <div>
                    <a className={`${styles.aIconButton} ma-p ${isFavourite ? styles.added : ''}`} onClick={(e) => handleAddToFav(e, beerInfo?.id)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                    <a className={`${styles.aIconButton} ma-p ${isBookmarked ? styles.added : ''}`} onClick={(e) => handleAddToCuddy(e, beerInfo?.id)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                </div>
                <div className={styles.ratingAndComments}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(beerInfo?.rating)}
                    </div>
                    <p className="ma-p">({beerInfo?.rating})</p>
                    <div className={styles.circle}/>
                    <a className="ma-p"> <CommentIcon/> 116 комментариев</a>
                </div>
                <IconButton text="добавить check-in" style="secondary"><CheckInIcon/></IconButton>
                { showPrice &&
                    <div className={styles.cartAndPrice}>
                        <h2 style={{color: "var(--primary)"}}>380₽</h2>
                        <IconButton text="Добавить в корзину" style="primary"><BottlesPairIcon/></IconButton>
                    </div>
                }
            </div>
            <div className={styles.descriptionMobile}>
                <p className="ma-p">Классический светлый пилснер в чешском стиле. Сваренный на светлом солоде типа пилс, с жатецким хмелем Saaz. Прозрачного золотистого цвета, с плотной пенной шапкой. Имеет насыщенный хмелевой аромат с цветочными нотами. Вкус яркий, искристый с отличным хмелево-солодовым балансом. Горечь уверенная, но не выпирающая. Послевкусие хмелевое.</p>
                <div>
                    <ul className={styles.characteristicsList}>
                        <li><p className="ma-p">Пивоварня: <a href="">{beerInfo?.brewery_name}</a></p></li>
                        <li><p className="ma-p">Стиль: <a href="">{beerInfo?.style_name}</a></p></li>
                        <li><p className="ma-p">Начало выпуска: <p style={{color: "var(--txt-active)"}}>{beerInfo?.start_date_sales}</p></p></li>
                        <li><p className="ma-p">Производство: <p style={{color: "var(--txt-active)"}}>{beerInfo?.production}</p></p></li>
                    </ul>
                </div>
            </div>
            <ImageVideoModal src={selectedPicture} setSrc={setSelectedPicture} show={showModal} setShow={setShowModal} />

        </div>

    )
}
