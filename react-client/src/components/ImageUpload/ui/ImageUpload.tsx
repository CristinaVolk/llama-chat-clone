import {FormEvent, LegacyRef, useRef, useState} from "react";

import {Image} from "../../Image/ui/Image.tsx";

import EditIcon from  "../../../assets/edit.svg"
import UploadPhotoHereImage from '../../../assets/upload-photo-here.png'
import LoadingIcon from '../../../assets/uploading.gif'


export const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState(UploadPhotoHereImage);
    const fileUploadRef = useRef<HTMLInputElement>(null)
    const handleImageUpload = (event: FormEvent) => {
        event.preventDefault()
        fileUploadRef?.current?.click()
    }

    const handleImageDisplay = async () => {
        const uploadedImage = fileUploadRef?.current?.files?.[0]
        if (!uploadedImage) {
            return
        }
        const formData = new FormData()
        formData.append("file", uploadedImage)
        setImageUrl(LoadingIcon)

        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
                method: "POST",
                body: formData
            })

            if (response.status === 201) {
                const data = await response.json()
                setImageUrl(data.location)
            }
        } catch (err) {
            console.error(err)
            setImageUrl(UploadPhotoHereImage)
        }
    }

    return (
        <div className="relative">
            <Image
                src={imageUrl}
                alt="Avatar upload"
                className="h-14 w-16 rounded"
            />
            <form
                encType="multipart/form-data"
                className="flex flex-col"
            >
                <button
                    type="submit"
                    className="flex-center relative left-3 right-14 h-7 w-7 rounded-full"
                    onClick={handleImageUpload}
                >
                    <img
                        src={EditIcon}
                        alt="Edit"
                        className="object-cover"
                    />

                </button>
                <input
                    hidden
                    id="file"
                    type="file"
                    ref={fileUploadRef as LegacyRef<HTMLInputElement>}
                    onChange={handleImageDisplay}
                />
            </form>
        </div>
    )
}