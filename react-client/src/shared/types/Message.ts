export interface Message {
    type: "send" | "receive"
    body: string
    format: "file" | "text"
    fileName?: string
}