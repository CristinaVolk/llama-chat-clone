import {ChatMessage} from "../../ChatMessage/ui/ChatMessage.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
import {io, Socket} from 'socket.io-client'

interface Message {
    type: "send" | "receive"
    message: string
}


export const ChatLog = () => {
    const [newSocket, setNewSocket] = useState<Socket>()
    const [inputValue, setInputValue] = useState<string>('')
    const [messages, setMessages] = useState<Array<Message>>([])

    useEffect(() => {
        const newSocket = io("http://localhost:8000")
        setNewSocket(newSocket)

        newSocket.on("response", (message: string) => {
            setMessages(prevState => [
                    ...prevState,
                    {
                        type: "receive",
                        message
                    }
                ])
        })

        return () => {
            newSocket.close()
        }
    }, []);

    const onChangeInput = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    const sendMessage = () => {
        setMessages(prevState => [
            ...prevState,
            {type: "send", message: inputValue}
        ])
        setInputValue('')
        newSocket!.emit("message", inputValue)
    }

    return (
        <div className="p-5 h-screen bg-black">
            <div className="container mx-auto bg-gray-900 h-full flex flex-col">
                <div className="flex flex-grow flex-col content-end p-3 space-y-3">
                    {messages.map(({type, message} : Message, index) =>
                        <ChatMessage key={index} type={type} message={message}/>
                    )}
                </div>

                <div
                    className="h-[100px] flex p-3 justify-center items-center bg-gray-700"
                >
                    <input
                        type="text"
                        onKeyDown={onKeyDownInput}
                        value={inputValue}
                        onChange={onChangeInput}
                        placeholder="Ask me anything..."
                        className="w-full p-2 bg-transparent text-white border-2 rounded-md outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-violet-600 px-3 p-2 rounded-md mx-2 text-white cursor-pointer"
                    >Send</button>
                </div>
            </div>
        </div>
    )
}