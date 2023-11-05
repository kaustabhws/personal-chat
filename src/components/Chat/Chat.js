import React, { useContext } from 'react'
import './Chat.css'
import Messages from './Messages/Messages'
import SendText from './SendText/SendText'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

    const { data } = useContext(ChatContext)

    return (
        <div className='chatsContainer'>
            <div id="receivers">
                <div className="receiverDetails">
                    <div className="receiverInfo">
                        <img src={data.user?.photoURL} alt="" />
                        <h3>{data.user?.displayName}</h3>
                    </div>
                    <div className="moreButtons">
                        <i class="fa-solid fa-video fa-xl"></i>
                        <i class="fa-solid fa-user fa-xl"></i>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
            <div className="messages">
                <Messages />
            </div>
            <div className="inputMessage">
                <SendText />
            </div>
        </div>
    )
}

export default Chat