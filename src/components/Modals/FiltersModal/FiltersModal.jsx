import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import styles from "./FiltersModal.module.css";

export default function FiltersModal({show, setShow, children}){

    return(
        <SimpleModal show={show} setShow={setShow} title="Фильтры" style={{background: "var(--bg)"}}>
            <div className={`${styles.menuFiltersMobile}`}>
                {children}
            </div>
        </SimpleModal>
    )
}