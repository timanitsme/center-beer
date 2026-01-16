import {useState} from "react";
import styles from "./BreweryHistory.module.scss";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import contactsPicture from "../../assets/bgPictures/contacts-bg.webp"

export default function BreweryHistoryApi({stories}){
    const [showAllStories, setShowAllStories] = useState(false);


    const visibleStories = showAllStories ? stories : stories.slice(0, 3);

    return(
        <div className={styles.historyContainer} id="brewery-history" style={{backgroundImage: `url(${contactsPicture})`}}>
            {visibleStories.map((story, index) => {
                if(index % 2 === 0){
                    return(
                        <div key={index} className={styles.story}>
                            <div className={styles.description}>
                                {story.block_title && <h5 className="ma-h4">{story.block_title}</h5>}
                                <p className="ma-p">{story.text}</p>
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
                                {story.block_title && <h5>{story.block_title}</h5>}
                                <p className="ma-p">{story.text}</p>
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
                <>
                    <div className={styles.space}></div>
                    <div className={styles.buttonRow}>
                        <SimpleButton text={"Скрыть историю"} onClick={() => setShowAllStories(false)}></SimpleButton>
                    </div>
                </>
            )}
        </div>
    )
}