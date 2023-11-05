import React, { useContext, useEffect, useState } from 'react'
import './Chats.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Messages = () => {

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsub();
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    const handleUserSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <div className='chatPreviewContainer'>
            <div className="previewBoxes">
                {chats && Object.entries(chats)?.sort((x,y)=>y[1].date - x[1].date).map((chat) => (
                    <div className="previewBox" key={chat[0]} onClick={() => handleUserSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="textInfo">
                            <h3>{chat[1].userInfo.displayName}</h3>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Messages;
