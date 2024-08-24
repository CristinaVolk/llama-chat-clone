import {useEffect, useState} from "react";

interface ImageProps {
    imgSrcInBase64?: string,
    alt: string,
    className: string
    src?: string
}

export const Image = (props: ImageProps) => {
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
}