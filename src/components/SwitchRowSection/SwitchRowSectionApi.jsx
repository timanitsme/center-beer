import {useEffect, useState} from "react";
import styles from "./SwitchRowSection.module.scss";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import ShortenedRowSection from "../ShortenedRowSection/ShortenedRowSection.jsx";

export default function SwitchRowSectionApi({ title, options, selectedOption, setSelectedOption }) {
    return (
        <div className={styles.sectionContainer}>
            {title && <h3 className="ma-h3">{title}</h3>}
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


            {selectedOption.error && <p className="ma-p">Ошибка загрузки</p>}
            {!selectedOption.isLoading && !selectedOption.error && (
                selectedOption?.cards?.data?.length > 0 ? (
                    <ShortenedRowSection
                        cards={selectedOption.cards.data}
                        maxCards={selectedOption.maxCards || 5}
                        CardComponent={selectedOption.CardComponent}
                        totalItems={selectedOption.cards.total_items}
                        SkeletonCardComponent={selectedOption.SkeletonCardComponent}
                        isFetching={selectedOption.isFetching}
                    />
                ) : (
                    <p className="ma-p">Нет данных</p>
                )
            )}
        </div>
    );
}