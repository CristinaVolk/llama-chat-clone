import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Message} from "../../../../shared/types/Message.ts";
import {convertToBase64} from "../../../../shared/helpers/convertToBase64.ts";

export const useChatLog = () => {
    const socketRef = useRef<Socket>()
    const [inputValue, setInputValue] = useState<string>('')
    const [messages, setMessages] = useState<Array<Message>>([])
    const [file, setFile] = useState<File | null>(null)

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
            setInputValue(event.target.files[0].name)
            setFile(event.target.files[0])
        }
    }

    const sendMessage = async (event?: FormEvent) => {
        event?.preventDefault()
        let messageObject: Message

        if (!inputValue) {
            return
        }

        if (file) {
            const fileBase64 = await convertToBase64(file)
            if (!fileBase64) {
                return
            }
            messageObject = {
                type: "send",
                format: "file",
                body: fileBase64,
                fileName: file.name
            }
        } else {
            messageObject = {
                type: "send",
                body: inputValue,
                format: "text"
            }
        }

        setFile(null)
        setInputValue("")
        receivedMessage(messageObject)
        socketRef.current?.emit("send message", messageObject)
    }

    return {
        setFile,
        messages,
        socketRef,
        selectFile,
        inputValue,
        sendMessage,
        handleChange,
        handleChangeOnEnter,
    }
}