import {Message} from "../../ChatLog/model/types/Message.ts";
import {Image} from "../../Image/ui/Image.tsx";

interface ChatMessageProps {
    message: Message
}

export const ChatMessage = (props: ChatMessageProps) => {
    const {message} = props
    const {body, type, format, fileName} = message


    function renderMessage() {
        if (format === "file") {
            // const blob = new Blob([body], {type: mimeType})

            if (type === "send") {
                return (
                    <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg">
                        <Image file={body as File} alt={fileName ?? ""} className={"w-[150px] h-auto"} />
                    </div>
                )
            } else if (type === "receive")  {
                return (
                    <div className="bg-white p-2 rounded-b-lg rounded-tl-lg">
                        <Image file={body as File} alt={fileName ?? ""} className={"w-[150px] h-auto"}/>
                    </div>
                )
            }
        } else if (format === "text") {
            if (type === "send") {
                return (
                    <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg">
                        {String(body)}
                    </div>
                )
            } else {
                return (
                    <div className="bg-white p-2 rounded-b-lg rounded-tl-lg">
                        {String(body)}
                    </div>
                )
            }
        }


    }

    return (
        <div className={`flex w-full ${
            type === "send" ? "justify-start" : "justify-end"
        }`}>
            {renderMessage()}
        </div>
    )
}