import React, { useEffect } from 'react'
import SideBar from '../Sidebar/SideBar'
import Chat from '../Chat/Chat'
import './Home.css'

const Home = () => {

    useEffect(() => {
        const bottom = document.querySelector('.chatContainer')
        bottom.scrollTop = bottom.scrollHeight;
      }, [])

    return (
        <div className='chatboxContainer'>
            <div className="sidebarContainer">
                <SideBar />
            </div>
            <div className="chatContainer">
                <Chat />
            </div>
        </div>
    )
}

export default Home