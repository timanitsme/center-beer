import styles from "./SimpleModal.module.css"
import {useEffect, useState} from "react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import EventImage from "../../../assets/eventsMocks/event-picture-3.svg"

export default function SimpleModal({show, setShow, children, title="", style={}}){
    useEffect(() => {
        // Блокируем прокрутку при открытии модального окна
        if (show) {
            document.body.style.overflow = 'hidden';
        }

        // Возвращаем прокрутку при закрытии модального окна
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    if (show){
        return (
            <div className={styles.modalOverlay} onMouseDown={() => setShow(false)}>
                <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()} style={style}>
                    <div className={styles.modalHeader}>
                        {title && title.trim().length!==0 &&
                            <div className={styles.titleWrapper}>
                                <h3 className={styles.title}>{title}</h3>
                            </div>
                        }
                        <div onClick={() => setShow(false)}><CloseIcon/></div>
                    </div>
                    {children}
                </div>
            </div>
        )
    }
}