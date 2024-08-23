import {useEffect, useState} from "react";

interface ImageProps {
    blob?: Blob,
    alt: string,
    className: string
    src?: string
}

export const Image = (props: ImageProps) => {
    const {blob, alt, className, src} = props
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        if (blob) {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = function () {
                if (reader.result) {
                    setImageSrc(reader.result as string)
                }
            }
        }

        if (src) {
            setImageSrc(src)
        }
    }, [blob, src]);

    return (
        <img
            alt={alt}
            src={imageSrc}
            className={className}
        />
    )
}