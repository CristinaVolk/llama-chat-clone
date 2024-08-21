interface ChatMessageProps {
    message: string,
    type?: "send" | "receive"
}

export const ChatMessage = (props: ChatMessageProps) => {
    const {message, type} = props

    return (
        <div className={`flex w-full ${
            type === "send" ? "justify-start" : "justify-end"
        }`}>
            {type === "send"
            ? (
                    <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg">
                        {message}
                    </div>
                )
            : (
                    <div className="bg-white p-2 rounded-b-lg rounded-tl-lg">
                        {message}
                    </div>
                )}
        </div>
    )
}