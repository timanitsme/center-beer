import {useState} from "react";
import BlogImage1 from "../../assets/newsMocks/blog-image-1.svg";
import BlogImage2 from "../../assets/newsMocks/blog-image-2.svg";
import BlogImage3 from "../../assets/newsMocks/blog-image-3.svg";
import styles from "./AboutDetailSection.module.css";
import {Link} from "react-router-dom";
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
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