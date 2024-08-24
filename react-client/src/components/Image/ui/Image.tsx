import {memo, useEffect, useState} from "react";

interface ImageProps {
    alt: string,
    src?: string
    className: string
    imgSrcInBase64?: string,
}

export const Image = memo((props: ImageProps) => {
    const {imgSrcInBase64, alt, className, src} = props
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect( () => {
        async function loadImagSrc() {
            if (imgSrcInBase64) {
                setImageSrc(imgSrcInBase64)
            }

            if (src) {
                setImageSrc(src)
            }
        }

        loadImagSrc()
    }, [imgSrcInBase64, src]);

    return (
        <img
            alt={alt}
            src={imageSrc}
            className={className}
        />
    )
})