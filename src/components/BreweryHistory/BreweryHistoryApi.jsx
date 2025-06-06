import {useState} from "react";
import History1 from "../../assets/historyMocks/history-1.svg";
import History2 from "../../assets/historyMocks/history-2.svg";
import History3 from "../../assets/historyMocks/history-3.svg";
import History4 from "../../assets/historyMocks/history-4.svg";
import styles from "./BreweryHistory.module.css";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function BreweryHistoryApi({stories}){
    const [showAllStories, setShowAllStories] = useState(false);


    const visibleStories = showAllStories ? stories : stories.slice(0, 3);

    return(
        <div className={styles.historyContainer}>
            {visibleStories.map((story, index) => {
                if(index % 2 === 0){
                    return(
                        <div key={index} className={styles.story}>
                            <div className={styles.description}>
                                {story.block_title && <h3>{story.block_title}</h3>}
                                <p>{story.text}</p>
                            </div>
                            {story?.preview_url && story?.preview_url !== "" &&
                                <div className={styles.image}>
                                    <img src={story.preview_url} alt=""/>
                                </div>}
                        </div>
                    )
                }
                else{
                    return(
                        <div key={index} className={styles.story}>
                            <div className={styles.image}>
                                <img src={story.preview_url} alt=""/>
                            </div>
                            <div className={styles.description}>
                                {story.block_title && <h3>{story.block_title}</h3>}
                                <p>{story.text}</p>
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