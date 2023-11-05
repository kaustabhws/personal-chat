import React from 'react'
import './SideBar.css'
import Input from './Input/Input'
import User from './User/User'
import Chats from './Chats/Chats'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <User />
        <Input />
        <Chats />
    </div>
  )
}

export default SideBar