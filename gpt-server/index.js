import express from "express"
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createServer} from "node:http"
import { Server } from "socket.io";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "notus-7b-v1.Q3_K_S.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});

const app = express()
const server = createServer(app)

const PORT = process.env.PORT || 8000

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (sock) => {
    console.log("New connection")
    sock.on("message", async (msg) => {
        const llamaResponse = await session.prompt(msg)
        sock.emit("response", llamaResponse)
    })
})

server.listen(PORT, () => {
    console.log(`Server started on the port: ${PORT}`)
})