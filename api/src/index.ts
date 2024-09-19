import ws from "ws"
import http from "http"
import { createClient } from "redis"
import createDocId from "./utils/createDocId"
import { getDocById, sendSocketRes } from "./utils/utils"

export const redisClient = createClient()
const publisher = createClient()
const subscriber = createClient()

const server = http.createServer((req, res) => {
    res.end("Hi there")
})

const wss = new ws.Server({ server })

wss.on("connection", (socket) => {
    let currentDocId: string = '';
    let collaboaratorId: number = 0;
    let isProcessingRequest = false
    console.log("socket connected");

    socket.on("message", async (message: string) => {
        const parsedMsg = JSON.parse(message)
        const { type } = parsedMsg
        if (isProcessingRequest) {
            console.log("Request already processing");
            return
        }

        isProcessingRequest = true;

        switch (type) {
            case 'create-doc': {
                collaboaratorId = 1
                const { name } = parsedMsg
                currentDocId = await createDocId()
                const collaborators = [{ name, id: collaboaratorId }]
                await redisClient.hSet('docs', currentDocId, JSON.stringify({ collaborators }))
                sendSocketRes(socket, { type: 'new', docId: currentDocId, collaboaratorId, collaborators })
                break;
            }
            case 'join-doc': {
                const { name, docId } = parsedMsg;
                const doc = await getDocById(docId);
                if (!doc)
                    return sendSocketRes(socket, { type: 'error', message: 'No such document exists' })

                collaboaratorId = doc.collaboarators.length + 1
                currentDocId = docId

                const collaborators = [...doc.collaboarators, { name, id: collaboaratorId }]
                await redisClient.hSet('docs', currentDocId, JSON.stringify({ collaborators }))
                sendSocketRes(socket, { type: 'new', docId: currentDocId, collaboaratorId, collaborators })
                break;
            }
            default:
                break;
        }


    })
})

const startServer = async () => {
    await redisClient.connect()
    await publisher.connect()
    await subscriber.connect()
    server.listen(process.env.PORT || 8080, () => {
        console.log("Web socket server running");
    })
}

startServer()