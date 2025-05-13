import styles from "./EventMap.module.css"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useEffect, useRef, useState} from "react";
import {FaMinus, FaPlus} from "react-icons/fa6";
import {isMobile} from "react-device-detect";
import ImagePlaceholder from "../../assets/placeholders/card-image-placeholder.svg"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function EventMap({svg, markers, selectedMarker, setSelectedMarker, breweries, setShowModal, lightMarker, setLightMarker}){
    //const decodedSvg = decodeURIComponent(svg.replace('data:image/svg+xml,', ''));
    const decodedSvg = svg
    const [scaleFactor, setScaleFactor] = useState(1)
    const [viewBoxWidth, setViewBoxWidth] = useState(1)
    const [viewBoxHeight, setViewBoxHeight] = useState(1)
    const [currentScale, setCurrentScale] = useState(1)
    const transformRef = useRef(null);

    useEffect(() => {
        if (lightMarker !== null && transformRef.current) {
            const markerElement = document.querySelector(`.${styles.marker}[data-marker-id="${lightMarker}"]`);
            if (markerElement) {
                transformRef.current.zoomToElement(markerElement, 3);
            }
        }
    }, [lightMarker]);

    useEffect(() => {
        const parcedSvg = document.querySelector(`.${styles.svgWrapper} svg`);
        if (parcedSvg) {
            //const svgViewBox = parcedSvg.getAttribute("viewBox")?.split(/\s+|,/);
            setViewBoxWidth(Number(parcedSvg.getAttribute("width"))) //svgViewBox?.[2]
            setViewBoxHeight(Number(parcedSvg.getAttribute("height"))) // svgViewBox?.[3]
        }
        const handleResize = () => {
            setScaleFactor(calculateScaleFactor(parcedSvg.getAttribute("width")));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [svg]);

    const calculateScaleFactor = (viewBoxWidth) => {
        const containerWidth = document.querySelector(`.${styles.svgWrapper} svg`)?.clientWidth || window.innerWidth;
        return containerWidth / viewBoxWidth;
    };

    return (
        <TransformWrapper
            initialScale={isMobile? 1.1: 1}
            minScale={0.25}
            maxScale={7}
            panning={{ disabled: false }}
            wheel={{ disabled: false }}
            pinch={{ disabled: false }}
            onZoom={(e) => setCurrentScale(e.state.scale)}
            ref={transformRef}
        >
            {({ zoomIn, zoomOut }) => (
                <div style={{ position: 'relative', width: '100%', height: '100%', background: "url('https://center.beer/uploads/fest_map_bg.jpg')", backgroundSize: "cover"}}>
                    {selectedMarker !== -1 &&
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                        }}>
                            <SimpleButton text="Показать списком" onClick={() => setSelectedMarker(-1)}></SimpleButton>
                        </div>
                    }
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                    }}>
                        <button onClick={() => {zoomIn()}} className={styles.zoomButton}>
                            <FaPlus/>
                        </button>
                        <button onClick={() => {zoomOut()}} className={styles.zoomButton}>
                            <FaMinus/>
                        </button>
                    </div>
                    <TransformComponent wrapperStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                        <div
                            className={styles.mapContent}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            <div className={styles.svgWrapper} dangerouslySetInnerHTML={{ __html: decodedSvg }} />
                            <div
                                className={styles.rectangle}
                                onClick={() => setShowModal(true)}
                                style={{
                                    position: 'absolute',
                                    left: `${(504.26 / viewBoxWidth) * 100}%`,
                                    top: `${(129.815 / viewBoxHeight) * 100}%`,
                                    width: `${247.16 * scaleFactor}px`,
                                    height: `${51.65 * scaleFactor}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <span className={styles.flare}></span>
                            </div>
                            {markers?.map((marker) => {
                                const lightMarkerNum = Number(lightMarker)
                                return (
                                    <div
                                        className={`${styles.marker} ${selectedMarker === marker.id? styles.selected: ""}`}
                                        key={`${marker.id}`}
                                        data-marker-id={marker.id}
                                        style={{
                                            position: 'absolute',
                                            left: `${(marker.x / viewBoxWidth) * 100}%`,
                                            top: `${(marker.y / viewBoxHeight) * 100}%`,
                                            width: selectedMarker === marker.id || lightMarkerNum === marker.id ? `${marker.width * 1.5 * scaleFactor}px` : `${marker.width * scaleFactor}px`,
                                            height: selectedMarker === marker.id || lightMarkerNum === marker.id ? `${marker.height * 1.5 * scaleFactor}px` : `${marker.height * scaleFactor}px`,
                                            backgroundColor: lightMarkerNum === marker.id? "var(--primary)": "var(--section-bg)"
                                        }}
                                        onClick={() => {
                                            if (lightMarker){
                                                setLightMarker(null)
                                            }
                                            if (selectedMarker !== marker.id){
                                                setSelectedMarker(marker.id)
                                            }
                                            else{
                                                setSelectedMarker(null)
                                            }
                                        }}
                                    >

                                        <img
                                            src={breweries[marker.id]?.brewery_logo}
                                            alt="Brewery Icon"
                                            onError={(e) => e.target.src=ImagePlaceholder}
                                        />

                                    </div>
                                )
                            })}
                        </div>
                    </TransformComponent>
                </div>
            )}
        </TransformWrapper>
    );
}