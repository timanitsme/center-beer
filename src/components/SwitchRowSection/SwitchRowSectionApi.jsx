import {useEffect, useState} from "react";
import styles from "./SwitchRowSection.module.scss";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import ShortenedRowSection from "../ShortenedRowSection/ShortenedRowSection.jsx";

export default function SwitchRowSectionApi({ title, options, selectedOption, setSelectedOption }) {
    return (
        <div className={styles.sectionContainer}>
            {title && <h3>{title}</h3>}
            <div className={styles.buttonSwitch}>
                {options.map((option, index) => (
                    <IconButton
                        key={index}
                        text={option.title}
                        style={selectedOption.title === option.title ? "primary" : "secondary"}
                        onClick={() => setSelectedOption(option)}
                    />
                ))}
            </div>

            {selectedOption.isLoading && <p>Загрузка...</p>}
            {selectedOption.error && <p style={{ color: 'red' }}>Ошибка загрузки</p>}
            {!selectedOption.isLoading && !selectedOption.error && (
                selectedOption?.cards?.data?.length > 0 ? (
                    <ShortenedRowSection
                        cards={selectedOption.cards.data}
                        maxCards={selectedOption.maxCards || 5}
                        CardComponent={selectedOption.CardComponent}
                    />
                ) : (
                    <p>Нет данных</p>
                )
            )}
        </div>
    );
}