import styles from "./EventMapSidebar.module.css"
import {useState} from "react";

export default function EventMapSidebar({isExpanded, setIsExpanded}){

    return(
        <div className={`${styles.sidebar} ${isExpanded? styles.expanded: ''}`}>

        </div>
    )
}