import {ChatMessage} from "../../ChatMessage/ui/ChatMessage.tsx";
import {ImageUpload} from "../../ImageUpload/ui/ImageUpload.tsx";
import {useChatLog} from "../model/hooks/useChatLog.ts";
import {Message} from "../../../shared/types/Message.ts";
import AttachImgIcon from "../../../assets/attach-img.png";


export const ChatLog = () => {
    const {
        messages,
        selectFile,
        inputValue,
        sendMessage,
        handleChange,
        pictureUploadRef,
        handleImageUpload,
        handleChangeOnEnter,
    } = useChatLog()



    return (
        <div className="p-5 h-screen bg-black">
            <div className="container mx-auto bg-gray-900 h-full flex flex-col">
                <div className="flex flex-grow flex-row items-end p-3">
                    <div className="w-full p-2 space-y-3 overflow-auto h-[75vh]">
                        {messages.map((message : Message, index) =>
                            <ChatMessage key={index} message={message} />
                        )}
                    </div>
                </div>

                <div
                    className="h-[100px] w-full flex p-3 justify-center items-center bg-gray-700"
                >
                    <div className="p-3">
                        <ImageUpload />
                    </div>

                    <form
                        onSubmit={sendMessage}
                        className="flex items-center w-full p-2 bg-transparent text-white border-2 rounded-md outline-none"
                    >
                        <textarea
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Ask me anything..."
                            className="w-full bg-transparent mr-2"
                            onKeyDown={handleChangeOnEnter}
                        />
                        <button
                            className="flex-center left-3 right-14 h-7 w-7 rounded-full"
                            onClick={handleImageUpload}
                        >
                            <img
                                src={AttachImgIcon}
                                alt="attach image"
                                className="object-cover"
                            />

                        </button>
                        <input
                            hidden
                            type="file"
                            ref={pictureUploadRef}
                            onChange={selectFile}
                            accept="*.jpeg *.png *.jpg"
                        />
                        <button className="bg-violet-600 px-3 p-2 rounded-md mx-2 text-white cursor-pointer">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}