import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Message} from "../../../../shared/types/Message.ts";
import {convertToBase64} from "../../../../shared/helpers/convertToBase64.ts";

export const useChatLog = () => {
    const socketRef = useRef<Socket>()
    const [inputValue, setInputValue] = useState<string>('')
    const [messages, setMessages] = useState<Array<Message>>([])
    const [picture, setPicture] = useState<File | null>(null)
    const pictureUploadRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (event: FormEvent) => {
        event.preventDefault()
        pictureUploadRef?.current?.click()
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8000")
        socketRef.current = newSocket

        socketRef.current.on("response", (message: Message) => {
            receivedMessage(message)
        })

        return () => {
            socketRef.current?.close()
        }
    }, []);

    function receivedMessage(messageObject: Message) {
        setMessages(prevState => [
            ...prevState,
            {...messageObject}
        ])
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const handleChangeOnEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    function selectFile(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const uploadedPicture = pictureUploadRef?.current?.files?.[0]
            if (uploadedPicture) {
                setInputValue(uploadedPicture.name)
                setPicture(uploadedPicture)
            }
        }
    }

    const sendMessage = async (event?: FormEvent) => {
        event?.preventDefault()
        let messageObject: Message

        if (!inputValue) {
            return
        }

        if (picture) {
            const fileBase64 = await convertToBase64(picture)
            if (!fileBase64) {
                return
            }
            messageObject = {
                type: "send",
                format: "file",
                body: fileBase64,
                fileName: picture.name
            }
        } else {
            messageObject = {
                type: "send",
                body: inputValue,
                format: "text"
            }
        }

        setPicture(null)
        setInputValue("")
        receivedMessage(messageObject)
        socketRef.current?.emit("send message", messageObject)
    }

    return {
        messages,
        socketRef,
        selectFile,
        inputValue,
        sendMessage,
        handleChange,
        pictureUploadRef,
        handleImageUpload,
        handleChangeOnEnter,
    }
}