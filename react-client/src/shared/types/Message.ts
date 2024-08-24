export interface Message {
    body: string
    fileName?: string
    type: "send" | "receive"
    format: "file" | "text"
}