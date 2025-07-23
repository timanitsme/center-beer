import styles from "./SimpleModal.module.scss"
import {useEffect} from "react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import {createPortal} from "react-dom";

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
        return createPortal(
            <div className={styles.modalOverlay} onMouseDown={() => setShow(false)}>
                <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()} style={style}>
                    <div className={styles.modalHeader}>
                        {title && title.trim().length!==0 &&
                            <div className={styles.titleWrapper}>
                                <h5 className={styles.title}>{title}</h5>
                            </div>
                        }
                        <div onClick={() => setShow(false)}><CloseIcon/></div>
                    </div>
                    {children}
                </div>
            </div>,
            document.body
        )
    }
}