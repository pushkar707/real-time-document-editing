import { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import SocketAtom from '../atoms/SocketAtom'
import { connectSocket } from '../utils/connectSocket'
import DocDataAtom from '../atoms/DocDataAtom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [showCreateDocPopup, setshowCreateDocPopup] = useState(false)
    const [docCreatorName, setdocCreatorName] = useState('')
    const [name, setName] = useState('')
    const [docId, setdocId] = useState('')

    const setSocket = useSetRecoilState(SocketAtom)
    const setDocData = useSetRecoilState(DocDataAtom)
    const navigate = useNavigate()

    const createDoc = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        connectSocket(setSocket, setDocData, navigate, JSON.stringify({ type: 'create-doc', name: docCreatorName }))
    }

    const joinDoc = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        connectSocket(setSocket, setDocData, navigate, JSON.stringify({ type: 'create-doc', name, docId }))
    }
    return (
        <main className="flex px-4 justify-center flex-col items-center gap-y-7 h-[90vh] md:h-auto md:min-h-screen max-w-screen">
            {showCreateDocPopup ? <div className='absolute w-screen h-screen top-0 left-0 z-10 bg-gray-200 bg-opacity-90 flex justify-center items-center'>
                <form onSubmit={createDoc} className='bg-white px-8 py-6 rounded-md shadow relative pt-9'>
                    <span className="absolute top-1 right-2 text-lg font-medium cursor-pointer" onClick={() => setshowCreateDocPopup(false)}>X</span>
                    <input type="text" placeholder="Enter your name" value={docCreatorName} onChange={e => setdocCreatorName(e.target.value)} className="px-3 py-2 border border-black" />
                    <button className="bg-black px-3 py-2 text-white block mt-4">Create</button>
                </form>
            </div> : ''}
            <form className="bg-slate-800 text-slate-100 p-5 flex flex-col gap-6 max-w-xl" onSubmit={joinDoc}>
                <div className="flex flex-col gap-4">
                    <p className="font-semibold text-xl text-center">Work together on documents</p>
                    <p className="text-sm ">To get started, enter your name and a document id. Other contibutors can join your document with the same document id on their device.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="col-span-3 text-sm bg-slate-800 border border-slate-300 px-3 py-2" placeholder="Name" />
                    <input type="text" required value={docId} onChange={(e) => setdocId(e.target.value)} className="col-span-3 text-sm bg-slate-800 border border-slate-300 px-3 py-2" placeholder="Document id" />
                    <button className="w-fit mx-auto px-4 py-2 bg-black">Join Document</button>
                </div>
            </form>
            <button className="border px-2.5 py-1.5 border-black" onClick={() => setshowCreateDocPopup(true)}>Create Document</button>
        </main>
    )
}

export default Home