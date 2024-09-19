import ws from "ws"
import { redisClient } from ".."
export const sendSocketRes = (socket: ws, data: any) => {
    socket.send(JSON.stringify(data))
}

export const getDocById = async (id: string) => {
    const document = await redisClient.hGet('docs', id)
    if (!document) {
        return false
    }
    return JSON.parse(document)
}