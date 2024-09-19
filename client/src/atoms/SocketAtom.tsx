import { atom } from "recoil";

export default atom<WebSocket | null>({
    key: 'socketAtom',
    default: null
})