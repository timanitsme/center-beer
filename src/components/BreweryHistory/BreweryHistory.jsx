import styles from "./BreweryHistory.module.css"
import History1 from "../../assets/historyMocks/history-1.svg"
import History2 from "../../assets/historyMocks/history-2.svg"
import History3 from "../../assets/historyMocks/history-3.svg"
import History4 from "../../assets/historyMocks/history-4.svg"
import {useState} from "react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function BreweryHistory(){
    const [showAllStories, setShowAllStories] = useState(false);

    const stories = [
        {
            title: "МЫ ПОЙМАЛИ СВОЮ ВОЛНУ В 2008-ОМ",
            description: "Jaws - огромные волны, зарождающиеся у берегов гавайского острова мауи. Один вид этой волны завораживает, а чтобы описать красоту и могущество трудно подобрать слова. Для многих сёрферов покорение этой волны становится делом всей жизни.",
            image: History1,
        },
        {
            title: "JAWS НАЧАЛО",
            description: "Небольшой брюпаб, расположенный в здании бывшей прачечной атомного моногорода Заречный, начал дарить гостям радость честно сваренного пива. Первые годы работы были пропитаны вкусом немецких и чешских классических стилей — мы сохранили его в нашем пшеничном эле Jaws Weizen, дебютном сорте пивоварни, который до сих пор производится на постоянной основе.",
            image: History2,
        },
        {
            title: "2012 ГОД ИЗМЕНИЛ КУРС JAWS",
            description: "2012 год изменил курс Jaws, наполнив его сочным хмелевым ароматом. Вдохновившись первыми успехами IPA в Европе, мы решились познакомить Урал с новыми вкусами пива. Это стало настоящим прорывом, который позволил нам не только укрепить свои позиции на рынке, но и завоевать сердца ценителей крафтового пива.",
            image: History3,
        },
        {
            description: "Череда преодолений и дружеского содействия позволили создать первую версию нашего хедлайнера, «Атомной Прачечной», объединившей в аномальном названии историю и настроение пивоварни. IPA с мощной фруктовой горчинкой хмелей Нового Света открывалось с первого глотка не каждому, но гипнотическая горечь возвращала к манящему вкусу.\n" +
                "Несколько коробок нашего IPA добрались до Москвы и Санкт-Петербурга, закрепив Jaws на российской карте пива новой волны — так была запущена цепная реакция, и сегодня приводящая многих в мир ярких вкусов пива.",
            image: History4,
        },
    ]

    const visibleStories = showAllStories ? stories : stories.slice(0, 3);

    return(
        <div className={styles.historyContainer}>
            {visibleStories.map((story, index) => {
                if(index % 2 === 0){
                    return(
                        <div key={index} className={styles.story}>
                            <div className={styles.description}>
                                {story.title && <h3>{story.title}</h3>}
                                <p>{story.description}</p>
                            </div>
                            <div className={styles.image}>
                                <img src={story.image} alt=""/>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div key={index} className={styles.story}>
                            <div className={styles.image}>
                                <img src={story.image} alt=""/>
                            </div>
                            <div className={styles.description}>
                                {story.title && <h3>{story.title}</h3>}
                                <p>{story.description}</p>
                            </div>
                        </div>
                    )
                }
            })}

            {stories.length > 3 && !showAllStories && (
                <>
                    <div className={styles.showAllContainer}>
                        <div className={styles.gradient}></div>
                    </div>
                    <div className={styles.buttonRow}>
                        <SimpleButton text={"Раскрыть историю"} onClick={() => setShowAllStories(true)}></SimpleButton>
                    </div>
                </>

            )}

            {stories.length > 3 && showAllStories && (
                <div className={styles.buttonRow}>
                    <SimpleButton text={"Скрыть историю"} onClick={() => setShowAllStories(false)}></SimpleButton>
                </div>
            )}
        </div>
    )
}