import { NavigateFunction } from "react-router-dom"

export const connectSocket = (setSocket: Function, setDocData: Function, navigate: NavigateFunction, initialMessage?: string) => {
    const socket = new WebSocket('http://localhost:8080')
    socket.onopen = () => {
        setSocket(socket)
        initialMessage && socket.send(initialMessage)
    }

    socket.onmessage = message => {
        const data = JSON.parse(message.data)
        if (data.type === 'new')
            setDocData(data)
        else if (data.type === 'append')
            setDocData((prev: any) => ({ ...prev, data }))

        if (data['docId']) {
            navigate('/doc/' + data['docId'])
            localStorage.setItem('docId', data['docId'])
        }
        if (data['docId'])
            localStorage.setItem('collaboratorId', data['collaboratorId'])
    }

    socket.onclose = () => {
        // TODO
    }
}