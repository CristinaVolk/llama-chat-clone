import {Message} from "../../../shared/types/Message.ts";
import {Image} from "../../Image/ui/Image.tsx";
import {memo} from "react";

interface ChatMessageProps {
    message: Message
}

export const ChatMessage = memo((props: ChatMessageProps) => {
    const {message} = props
    const {
        body,
        type,
        format,
        fileName
    } = message


    function renderMessage() {
        if (type === "send") {
            return (
                <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg">
                    {
                        format === "file"
                            ? <Image
                                alt={fileName ?? ""}
                                imgSrcInBase64={body}
                                className="w-[150px] h-auto"
                            />
                            : body
                    }
                </div>
            )
        } else if (type === "receive")  {
            return (
                <div className="bg-white p-2 rounded-b-lg rounded-tl-lg">
                    {
                        format === "file"
                            ? <Image
                                imgSrcInBase64={body}
                                alt={fileName ?? ""}
                                className="w-[150px] h-auto"
                            />
                            : body
                    }
                </div>
            )
        }
    }

    return (
        <div className={`flex w-full ${
            type === "send" ? "justify-start" : "justify-end"
        }`}>
            {renderMessage()}
        </div>
    )
})