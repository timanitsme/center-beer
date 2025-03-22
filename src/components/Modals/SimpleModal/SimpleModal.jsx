import styles from "./SimpleModal.module.css"
import {useState} from "react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import EventImage from "../../../assets/eventsMocks/event-picture-3.svg"

export default function SimpleModal({show, setShow, children}){

    if (show){
        return (
            <div className={styles.modalOverlay} onMouseDown={() => setShow(false)}>
                <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}><div onClick={() => setShow(false)}><CloseIcon/></div></div>
                    {children}
                </div>
            </div>
        )
    }
}