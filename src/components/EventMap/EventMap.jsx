import styles from "./EventMap.module.css"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useEffect, useState} from "react";
import HopIcon from "../../assets/hop-icon.svg?react"

export default function EventMap({svg, markers, isExpanded, setIsExpanded}){
    const decodedSvg = decodeURIComponent(svg.replace('data:image/svg+xml,', ''));
    const [viewBoxWidth, setViewBoxWidth] = useState(1)
    const [viewBoxHeight, setViewBoxHeight] = useState(1)
    const [currentScale, setCurrentScale] = useState(1)
    const [selectedMarker, setSelectedMarker] = useState(null)
    useEffect(() => {
        const parcedSvg = document.querySelector(`.${styles.svgWrapper} svg`);
        if (parcedSvg) {
            const svgViewBox = parcedSvg.getAttribute("viewBox")?.split(/\s+|,/);
            setViewBoxWidth(Number(svgViewBox?.[2]))
            setViewBoxHeight(Number(svgViewBox?.[3]))
        }
    }, [svg]);

    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.25}
            maxScale={3}
            panning={{ disabled: false }}
            wheel={{ disabled: false }}
            pinch={{ disabled: false }}
            onZoom={(e) => setCurrentScale(e.state.scale)}
        >
            {({ zoomIn, zoomOut, resetTransform }) => (
                <div style={{ position: 'relative', width: '100%', height: '100%', background: "white" }}>
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
                            {markers?.map((marker) => (
                                <div
                                    className={`${styles.marker} ${selectedMarker === marker.id? styles.selected: ""}`}
                                    key={marker.id}
                                    style={{
                                        position: 'absolute',
                                        left: `${(marker.x / viewBoxWidth) * 100}%`,
                                        top: `${(marker.y / viewBoxHeight) * 100}%`,
                                        transform: `translate(-50%, -50%) scale(${1 / currentScale})`,
                                    }}
                                    onClick={() => {
                                        if (selectedMarker !== marker.id){
                                            setSelectedMarker(marker.id)
                                            setIsExpanded(true)
                                        }
                                        else{
                                            setSelectedMarker(null)
                                            setIsExpanded(false)
                                        }
                                    }}
                                >
                                    <HopIcon></HopIcon>
                                </div>
                            ))}
                        </div>
                    </TransformComponent>
                </div>
            )}
        </TransformWrapper>
    );
}