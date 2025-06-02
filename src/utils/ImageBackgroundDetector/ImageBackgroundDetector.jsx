import {useEffect, useRef} from "react";

const ImageBackgroundDetector = ({ imageUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = imageUrl;

        image.onload = () => {
            ctx.drawImage(image, 0, 0);
            const pixelData = ctx.getImageData(0, 0, 1, 1).data;
            const [red, green, blue] = pixelData;
            const hexCode = rgbToHex(red, green, blue);
            console.log('Background color:', hexCode);
        };
    }, [imageUrl]);
    const rgbToHex = (r, g, b) =>
        `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

    return <canvas ref={canvasRef} />;
};

export default ImageBackgroundDetector;