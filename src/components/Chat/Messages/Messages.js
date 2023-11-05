import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import './Messages.css'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'

const Messages = () => {

  const [messages, setMessages] = useState([])

  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

  return (
    <div className='contactTextMessage'>
      {messages.map(mes => (
        <Message message={mes} key={mes.id} />
      ))}
    </div>
  )
}

export default Messages