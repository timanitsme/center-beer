import styles from "./NewCheckInForm.module.scss"
import AvatarDefault from "../../assets/avatar-default.svg";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import {FaPlus} from "react-icons/fa6";
import EmptyBeerBottleIcon from "../../assets/bottle-empty-icon.svg?react";
import HalfBeerBottleIcon from "../../assets/bottle-half-icon.svg?react";
import BeerBottleIcon from "../../assets/bottle-icon.svg?react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {useRef, useState} from "react";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import {IoCloseCircleOutline} from "react-icons/io5";
import {useAddCheckinMutation} from "../../store/services/centerBeer.js";
import SearchBars from "../ApiInputs/SearchBars/SearchBars.jsx";

export default function NewCheckInForm({ref, onSubmit, profile, id}){
    const [isHovered, setIsHovered] = useState(null)
    const [hoverPosition, setHoverPosition] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const bottles = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [addCheckin, {isLoading}] = useAddCheckinMutation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [text, setText] = useState("");
    const [selectedBar, setSelectedBar] = useState(null)
    const [error, setError] = useState("")

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (image?.url) {
            URL.revokeObjectURL(image.url);
        }

        setImage({
            file,
            url: URL.createObjectURL(file)
        });
    };

    const handleInput = (e) => {
        if (e.target.value.length < 301){
            setText(e.target.value)
        }
    }

    const handleImageRemove = () => {
        setImage(null)
    };


    const handleMouseEnter = (event, id) => {
        setIsHovered(id);
        updateHoverPosition(event); // Обновляем позицию при входе
    };

    const handleBottleClick = (id) => {
        if (selectedRating === 0){
            if (hoverPosition === 'left') {
                setSelectedRating(id - 0.5); // Выбрано значение с половиной (например, 1.5)
            } else if (hoverPosition === 'right') {
                setSelectedRating(id); // Выбрано целое значение (например, 2)
            }
        }
        else{
            setSelectedRating(0)
        }
    };

    const handleMouseMove = (event) => {
        if (isHovered) {
            updateHoverPosition(event); // Обновляем позицию при движении
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
        setHoverPosition(null);
    };

    const updateHoverPosition = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const cursorX = event.clientX - rect.left; // Координата X курсора относительно элемента
        const isLeftSide = cursorX < rect.width / 2; // Проверка, находится ли курсор слева от середины

        setHoverPosition(isLeftSide ? 'left' : 'right');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        if (!text.trim()){
            setError("Вы не написали комментарий")
            return;
        }
        if(selectedRating === 0 ){
            setError("Вы не указали рейтинг")
            return;
        }
        if(selectedBar === null ){
            setError("Вы не выбрали бар")
            return;
        }
        setIsSubmitting(true);
        try {
            await addCheckin({beerId: id, barId: selectedBar.id, comment: text, rating: selectedRating, photo: image}).unwrap();
            onSubmit({beerId: id, comment: text, rating: selectedRating, photo: image})
            setText("");
            setSelectedRating(0)
            setImage(null);
        } catch (error) {
            console.error("Ошибка при отправке комментария:", error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return(
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className={styles.checkIn} ref={ref}>
                <div className={styles.header}>
                    <img src={AvatarDefault} alt=""/>
                    <div className={styles.headerRows}>
                        <div className={styles.spaceBtw}>
                            <p className={`${styles.pHeader} ma-p`}>{profile?.nickname}</p>
                        </div>
                        <div className={styles.characteristics}>
                            <div>
                                <LocationIcon/>
                                <p className={`ma-p ${styles.active}`}>Выпил в: </p>
                                <SearchBars onSelect={(bar) => setSelectedBar(bar)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.checkInContent}>
                    <div className={styles.imageContainer}>
                        {image === null?
                            <div className={styles.newImage} onClick={triggerFileInput}>
                                <FaPlus/>
                            </div>
                            :
                            <div className={styles.uploadedImage}>
                                <img src={image.url} alt=""/>
                                <button onClick={handleImageRemove}>
                                    <IoCloseCircleOutline />
                                </button>
                            </div>
                        }
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    <div className={styles.checkInComment}>
                        <textarea className={`${styles.replyContentTextarea} ma-p`} disabled={isSubmitting} value={text} onChange={handleInput} placeholder="Введите ваше сообщение">

                        </textarea>
                        <div>
                            <div className={styles.replyButtons}>

                                <div className={`${styles.beerBottles} ${styles.minBottles}`} onMouseLeave={handleMouseLeave}>
                                    {bottles.map((bottle) => {
                                        return(
                                            <div key={bottle.id} onMouseEnter={(e) => handleMouseEnter(e, bottle.id)}
                                                 onMouseMove={handleMouseMove} onClick={() => handleBottleClick(bottle.id)}>
                                                {selectedRating > 0 && (
                                                    <>
                                                        {selectedRating < bottle.id - 0.5 && <EmptyBeerBottleIcon />}
                                                        {selectedRating === bottle.id - 0.5 && <HalfBeerBottleIcon />}
                                                        {selectedRating >= bottle.id && <BeerBottleIcon />}
                                                    </>
                                                )}

                                                {selectedRating === 0 && (
                                                    <>
                                                        {isHovered === null && <EmptyBeerBottleIcon />}
                                                        {isHovered !== null && isHovered < bottle.id && <EmptyBeerBottleIcon />}
                                                        {isHovered === bottle.id && hoverPosition === 'left' && <HalfBeerBottleIcon />}
                                                        {isHovered === bottle.id && hoverPosition === 'right' && <BeerBottleIcon />}
                                                        {isHovered > bottle.id && <BeerBottleIcon />}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                    <p style={{fontWeight: 500, color: "var(--primary)"}}>{selectedRating.toFixed(1)}</p>
                                </div>


                                <SimpleButton buttonType={"submit"} disabled={isSubmitting || !text.trim()} text="Отправить"/>
                            </div>
                        </div>
                    </div>
                </div>
                {error.length !== 0 && <p className="ma-p" style={{color: "var(--primary)"}}>{error}</p>}
            </div>
        </form>
    )
}