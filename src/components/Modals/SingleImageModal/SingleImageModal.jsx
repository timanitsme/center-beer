import styles from "./SingleImageModal.module.css"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import ImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"
import {useState} from "react";

export default function SingleImageModal({src, setSrc, show, setShow}){
    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.imageWrapper}>
                <img src={src} alt="" onError={() => setSrc(ImagePlaceholder)}/>
            </div>
        </SimpleModal>
    )
}
