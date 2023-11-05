import React, { useContext } from 'react'
import './Messages.css'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    return (
        <div className="alltexts">
            <div className={`textMessageContainer ${message.senderId === currentUser.uid ? 'sentText' : 'receivedText' }`}>
                <p className={`${message.senderId === currentUser.uid ? 'sent' : 'received' }`}>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
                <p className="timeStamp">Just now</p>
            </div>
        </div>
    )
}

export default Message