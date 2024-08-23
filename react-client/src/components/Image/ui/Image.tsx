import {useEffect, useState} from "react";

interface ImageProps {
    file?: File,
    alt: string,
    className: string
    src?: string
}

export const Image = (props: ImageProps) => {
    const {file, alt, className, src} = props
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect( () => {
        async function loadImagSrc() {
            if (file) {
                const resultImgSrc = await convertToBase64(file)
                setImageSrc(resultImgSrc)
            }

            if (src) {
                setImageSrc(src)
            }
        }

        loadImagSrc()
    }, [file, src]);

    function convertToBase64(file: File) : Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result as string)
                }
            }

            reader.onerror = (error) => {
                reject(error)
            }

        })
    }

    return (
        <img
            alt={alt}
            src={imageSrc}
            className={className}
        />
    )
}