import React, { useContext, useState } from 'react'
import './SendText.css'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../Firebase/Firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const SendText = () => {

    const [text, setText] = useState('')
    const [img, setImg] = useState('')

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if(!text) {
            return;
        }
        if (img) {
            const storageRef = ref(storage, uuid());

            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'chats', data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL
                        })
                    })
                });
            })

        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + ".lastMessage"] : {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + ".lastMessage"] : {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        setText('')
        setImg(null)
    }

    return (
        <div className='messageInput'>
            <div className="messageForm">
                <input type="file" id='image' style={{ display: 'none' }} onChange={e => setImg(e.target.files[0])} />
                <label htmlFor='image'><i className="fa-solid fa-plus"></i></label>
                <input type="text" placeholder='Type message' autoFocus onChange={e => setText(e.target.value)} value={text} />
                <i className="fa-solid fa-paper-plane" onClick={handleSend}></i>
                <i className="fa-regular fa-face-smile"></i>
            </div>
        </div>
    )
}

export default SendText;