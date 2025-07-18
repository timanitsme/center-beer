import styles from "./AboutDetailSection.module.scss";
import {Link} from "react-router-dom";
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import SimpleVideoCard from "../Cards/SimpleVideoCard/SimpleVideoCard.jsx";
import BorderedGradientButton from "../Buttons/BorderedGradientButton/BorderedGradientButton.jsx";


export default function AboutDetailSection({children, paths, sectionMenuItems, cards}){

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuItems.map((item, index) =>
                        <BorderedGradientButton key={index} onClick={() => window.location.href = item.path} text={item.title}/>
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <Link to={"/about-us"}><ArrowBackIcon/></Link>
                        <LightNavChain paths={paths}/>
                    </div>
                </div>
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        {children}
                    </div>
                    <div className={styles.contentSide}>
                        {cards.map((card, index) =>
                            <SimpleVideoCard key={index} cardInfo={card}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}