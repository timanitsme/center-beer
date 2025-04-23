import styles from "./CartSection.module.css"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import CheckBoxChild from "../Inputs/CheckBox/CheckBoxChild.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import {Fragment, useEffect, useState} from "react";
import MirIcon from "../../assets/payments/mir-pay-icon.svg?react"
import SberIcon from "../../assets/payments/sber-pay-icon.svg?react"
import SbpIcon from "../../assets/payments/sbp-icon.svg?react"
import UmoneyIcon from "../../assets/payments/umoney-icon.svg?react"
import WalletIcon from "../../assets/advantages/wallet-icon.svg?react";
import Radio from "../Inputs/Radio/Radio.jsx";
import RadioBox from "../Inputs/Radio/RadioBox.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import Bottle1 from "../../assets/bottlesMock/bottle-1.svg"
import Bottle2 from "../../assets/bottlesMock/bottle-2.svg"
import Bottle3 from "../../assets/bottlesMock/bottle-3.svg"
import Bottle4 from "../../assets/bottlesMock/bottle-4.svg"
import Bottle5 from "../../assets/bottlesMock/bottle-5.svg"
import PlusIcon from "../../assets/plus-icon.svg?react"
import MinusIcon from "../../assets/minus-icon.svg?react"
import TrashIcon from "../../assets/trash-icon.svg?react"


export default function CartSection(){
    const [promo, setPromo] = useState("")
    const methods = [
        {id: 1, Icon: MirIcon, text: "Банковской картой"},
        {id: 2, Icon: SberIcon, text: "Онлайн платеж"},
        {id: 3, Icon: SbpIcon, text: "Система быстрых платежей"},
        {id: 4, Icon: UmoneyIcon, text: "ЮMoney"},
        {id: 5, Icon: WalletIcon, text: "Наличными при получении"},
    ]
    const [selectedMethod, setSelectedMethod] = useState(methods[0].id)
    const [cardMinStyle, setCardMinStyle] = useState(false)

    const cards = [
        {title: "Небо над тагилом", image: Bottle1, manufacturer: "Бакунин, Санкт-Петербург, Россия", price: 760, abv: "6,5", og: "12", ibu: "32"},
        {title: "Небо над тагилом", image: Bottle1, manufacturer: "Бакунин, Санкт-Петербург, Россия", price: 760, abv: "6,5", og: "12", ibu: "32"},
        {title: "Небо над тагилом", image: Bottle1, manufacturer: "Бакунин, Санкт-Петербург, Россия", price: 760, abv: "6,5", og: "12", ibu: "32"},
        {title: "Небо над тагилом", image: Bottle1, manufacturer: "Бакунин, Санкт-Петербург, Россия", price: 760, abv: "6,5", og: "12", ibu: "32"},
    ]

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 550) {
                setCardMinStyle(false)
            }
            else {
                setCardMinStyle(true)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [cards]);


    return(
        <div className={styles.cartSection}>
            <h2>Корзина</h2>
            <div className={styles.cartContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.tableHeader}>
                        <CheckBox text="Выбрать все"></CheckBox>
                        <p className={styles.primary}>Удалить выбранное</p>
                    </div>
                    <div className={styles.goodsListSection}>
                        {cards.map((card, index) => {
                            if (cardMinStyle){
                                return(
                                    <Fragment key={index}>
                                        <div className={styles.good}>
                                            <CheckBoxChild/>
                                            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                                                <div style={{display: "flex", gap: "15px"}}>
                                                    <div className={styles.imageWrapper}><img src={card.image} alt=""/></div>
                                                    <div className={styles.buttonsRow}>
                                                        <div className={styles.plusMinusButton}><PlusIcon/></div>
                                                        <TextInput placeholder="0"></TextInput>
                                                        <div className={styles.plusMinusButton}><MinusIcon/></div>
                                                    </div>
                                                    <div className={styles.centerGood}>
                                                        <p className={`${styles.title} ${styles.primary}`}>{card.price}₽</p>
                                                    </div>
                                                    <div className={styles.trashButton}>
                                                        <TrashIcon></TrashIcon>
                                                    </div>
                                                </div>
                                                <div className={styles.goodDescription}>
                                                    <p className={`${styles.title} ${styles.primary}`} style={{textTransform: "uppercase"}}>{card.title}</p>
                                                    <p className={styles.active}>{card.manufacturer}</p>
                                                    <div className={styles.characteristicsRow}>
                                                        <div className={styles.characteristic}>
                                                            <p>Крепость:</p>
                                                            <p className={styles.active}>{card.abv}%</p>
                                                        </div>
                                                        <div className={styles.characteristic}>
                                                            <p>Плотность:</p>
                                                            <p className={styles.active}>{card.og}%</p>
                                                        </div>
                                                        <div className={styles.characteristic}>
                                                            <p>Горечь:</p>
                                                            <p className={styles.active}>{card.ibu}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {index !== cards.length-1 && <div className="hrtLine"/>}
                                    </Fragment>
                                )
                            }
                            else{
                                return(
                                    <Fragment key={index}>
                                        <div key={index} className={styles.good}>
                                            <CheckBoxChild/>
                                            <div className={styles.imageWrapper}><img src={Bottle1} alt=""/></div>
                                            <div className={styles.goodDescription}>
                                                <p className={`${styles.title} ${styles.primary}`} style={{textTransform: "uppercase"}}>Небо над Тагилом</p>
                                                <p className={styles.active}>Бакунин, Санкт-Петербург, Россия</p>
                                                <div className={styles.characteristicsRow}>
                                                    <div className={styles.characteristic}>
                                                        <p>Крепость:</p>
                                                        <p className={styles.active}>6,5%</p>
                                                    </div>
                                                    <div className={styles.characteristic}>
                                                        <p>Плотность:</p>
                                                        <p className={styles.active}>12%</p>
                                                    </div>
                                                    <div className={styles.characteristic}>
                                                        <p>Горечь:</p>
                                                        <p className={styles.active}>32</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.buttonsRow}>
                                                <div className={styles.plusMinusButton}><PlusIcon/></div>
                                                <TextInput placeholder="0"></TextInput>
                                                <div className={styles.plusMinusButton}><MinusIcon/></div>
                                            </div>
                                            <div className={styles.centerGood}>
                                                <p className={`${styles.title} ${styles.primary}`}>760₽</p>
                                            </div>
                                            <div className={styles.trashButton}>
                                                <TrashIcon></TrashIcon>
                                            </div>
                                        </div>
                                        {index !== cards.length-1 && <div className="hrtLine"/>}
                                    </Fragment>
                                )
                            }
                        })}


                    </div>


                    <div className={styles.deliverySection}>
                        <p className={styles.title}>Способ доставки</p>
                        <div className={styles.deliveryMethods}>
                            <div className={styles.delMethod}>
                                <RadioBox title="Заберу самостоятельно" selected={false}>
                                    <p className={styles.title}>Заберу самостоятельно</p>
                                </RadioBox>
                                <p className={styles.active} style={{marginLeft: "25px"}}>Вы выбрали 3 товара из 2 магазинов:</p>
                                <div className={styles.delBar}>
                                    <div><p className={styles.active}>1.</p></div>
                                    <div className={styles.barContent}>
                                        <div className={styles.imagesRow}>
                                            <div className={styles.imageWrapper}><img src={Bottle1} alt=""/></div>
                                            <div className={styles.imageWrapper}><img src={Bottle2} alt=""/></div>
                                            <div className={styles.imageWrapper}><img src={Bottle3} alt=""/></div>
                                        </div>
                                        <p className={styles.title}>13 RULES (Народный бар)</p>
                                        <div className={styles.row}>
                                            <LocationIcon></LocationIcon>
                                            <p>г. Москва, Сущевский вал, 41</p>
                                        </div>
                                        <div className={styles.row}>
                                            <div className={`${styles.circle} ${styles.opened}`}></div>
                                            <p>работает пн-пт с 10:00 до 22:00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hrtLine"/>
                                <div className={styles.delBar}>
                                    <div><p className={styles.active}>2.</p></div>
                                    <div className={styles.barContent}>
                                        <div className={styles.imagesRow}>
                                            <div className={styles.imageWrapper}><img src={Bottle4} alt=""/></div>
                                        </div>
                                        <p className={styles.title}>Alt-Dim Beer</p>
                                        <div className={styles.row}>
                                            <LocationIcon></LocationIcon>
                                            <p>Котельники, ул. Сосновая 1к.3</p>
                                        </div>
                                        <div className={styles.row}>
                                            <div className={`${styles.circle} ${styles.opened}`}></div>
                                            <p>работает пн-пт с 10:00 до 22:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.delMethod}>
                                <RadioBox title="Доставка курьером" selected={false}>
                                    <p className={styles.title}>Доставка курьером</p>
                                </RadioBox>
                                <p>Московская область, Люберцы, Октябрьский проспект, 141</p>
                                <SimpleButton style="secondary" text="Редактировать адрес"></SimpleButton>
                            </div>
                        </div>
                    </div>
                    <div className={styles.paymentSection}>
                        <p className={styles.title}>Способ оплаты</p>
                        <div className={styles.paymentMethods}>
                            {methods.map((method, index) => {
                                return(<div key={index} className={`${styles.method} ${method.id === selectedMethod? styles.active: ''}`} onClick={() => setSelectedMethod(method.id)}>
                                    <method.Icon/>
                                    <p>{method.text}</p>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>


                <div className={styles.rightSide}>
                    <div className={styles.cartSummary}>
                        <p className={styles.title}>Ваша корзина</p>
                        <div className={styles.col}>
                            <div className={styles.summaryRow}>
                                <p>3 товара</p>
                                <p className={styles.active}>1900₽</p>
                            </div>
                            <div className={styles.summaryRow}>
                                <p>Скидка</p>
                                <p className={styles.active}>500₽</p>
                            </div>
                            <div className={styles.summaryRow}>
                                <p>Доставка</p>
                                <p className={styles.active}>300₽</p>
                            </div>
                        </div>
                        <div className={styles.summaryRow}>
                            <p className={styles.title}>Итого</p>
                            <p className={`${styles.title} ${styles.primary}`}>1700₽</p>
                        </div>
                        <SimpleButton text="Оформить покупку"></SimpleButton>
                        <CheckBoxChild>
                            <p>Соглашаюсь с условиями использования и политикой конфиденциальности</p>
                        </CheckBoxChild>
                    </div>
                    <div className={styles.mobileCol}>
                        <div className={styles.pointsSection}>
                            <div className={styles.row}>
                                <Toggle/>
                                <p className={styles.title}>Списать баллы</p>
                            </div>
                            <p>У вас накоплено 266 баллов</p>
                            <p>Можно оплатить <span className={`${styles.title} ${styles.primary}`}>266₽</span></p>
                        </div>
                        <div className={styles.promoSection}>
                            <p className={styles.title}>Промокод</p>
                            <div className={styles.row}>
                                <TextInput placeholder="Введите код" inputValue={promo} setInputValue={setPromo}></TextInput>
                                <SimpleButton style="secondary" text="Применить"></SimpleButton>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}