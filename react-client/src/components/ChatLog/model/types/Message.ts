export interface Message {
    type: "send" | "receive"
    body: string | File
    format: "file" | "text"
    mimeType?: string
    fileName?: string
}