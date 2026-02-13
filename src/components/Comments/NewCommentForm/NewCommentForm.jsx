import styles from "./NewCommentForm.module.scss"
import {useRef, useState} from "react";
import {FaPaperclip, FaPaperPlane} from "react-icons/fa6";
import AvatarDefault from "../../../assets/avatar-default.svg";
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react";
import {IoCloseCircleOutline} from "react-icons/io5";
import {useAddBarCommentMutation} from "../../../store/services/centerBeer.js";


export default function NewCommentForm({ ref, onSubmit, profile, id }) {
    const [text, setText] = useState(""); // Состояние текста комментария
    const [isSubmitting, setIsSubmitting] = useState(false); // Состояние отправки
    const [isHovered, setIsHovered] = useState(null)
    const [hoverPosition, setHoverPosition] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const bottles = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [addBarComment, { isLoading }] = useAddBarCommentMutation();

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        if (images.length + files.length > 5) {
            alert("Можно загрузить максимум 5 изображений.");
            return;
        }

        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index); // Удаляем изображение по индексу
            return updatedImages;
        });
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
        if (!text.trim()) return;
        setIsSubmitting(true);
        try {
            const formData = {
                id: id,
                comment: text,
                rating: selectedRating,
                photos: images.map((image) => image.file), // Берем только файлы изображений
            };

            await addBarComment({barId: formData.id, comment: formData.comment, rating: formData.rating, photos: formData.photos}).unwrap();
            onSubmit(formData)
            setText("");
            setImages([]);
        } catch (error) {
            console.error("Ошибка при отправке комментария:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInput = (e) => {
        if (e.target.value.length < 301){
            setText(e.target.value)
        }
    }

    return (
        <div className={styles.comment} ref={ref}>
            <img className={styles.avatar} src={AvatarDefault} alt="Аватар" />
            <div className={styles.replyContent}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <p className={styles.pHeader} style={{marginBottom: "5px"}}>{profile?.nickname}</p>
                    <textarea
                        value={text}
                        onChange={handleInput}
                        placeholder="Напишите сообщение..."
                        className={styles.replyContentTextarea}
                        disabled={isSubmitting}
                    />
                    <div className={styles.replyAndPhotos}>
                        <div className={styles.photos}>
                            {images.map((image, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <img src={image.url} alt={`Загруженное фото ${index}`} />
                                    <button onClick={() => handleImageRemove(index)}>
                                        <IoCloseCircleOutline />
                                    </button>
                                </div>
                            ))}
                        </div>
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

                            <FaPaperclip
                                className={styles.replyButtonsIcon}
                                onClick={images.length < 5 ? triggerFileInput : null}
                                style={{ cursor: images.length < 5 ? "pointer" : "initial", opacity: images.length < 5 ? 1 : 0.5 }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !text.trim()}
                                className={styles.replyButtonsButton}
                            >
                                <FaPaperPlane className={styles.replyButtonsIcon} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}