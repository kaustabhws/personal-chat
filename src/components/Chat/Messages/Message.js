import React, { useContext, useEffect, useRef } from 'react'
import './Messages.css'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const ref = useRef(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavious: 'smooth'})
    }, [message]);

    return (
        <div className="alltexts">
            <div className={`textMessageContainer ${message.senderId === currentUser.uid ? 'sentText' : 'receivedText' }`}  ref={ref}>
                <p className={`${message.senderId === currentUser.uid ? 'sent' : 'received' }`}>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
                <p className="timeStamp">Just now</p>
            </div>
        </div>
    )
}

export default Message;
