import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Message} from "../types/Message.ts";

export const useChatLog = () => {
    const socketRef = useRef<Socket>()
    const [inputValue, setInputValue] = useState<string>('')
    const [messages, setMessages] = useState<Array<Message>>([])
    const [file, setFile] = useState<File>()

    useEffect(() => {
        const newSocket = io("http://localhost:8000")
        socketRef.current = newSocket

        socketRef.current.on("response", (message: string) => {
            receivedMessage({body: message, type: "receive", format: "text"})
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

    const sendMessage = (event?: FormEvent) => {
        event?.preventDefault()
        let messageObject: Message

        if (!inputValue) {
            return
        }

        if (file) {
            messageObject = {
                type: "send",
                format: "file",
                body: file,
                mimeType: file.type,
                fileName: file.name
            }
        } else {
            messageObject = {
                type: "send",
                body: inputValue,
                format: "text"
            }
        }

        receivedMessage(messageObject)
        setInputValue("")
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