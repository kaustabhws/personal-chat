import React, { useContext, useState } from 'react'
import './Input.css'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/Firebase';
import { AuthContext } from '../../context/AuthContext'

const Input = () => {

  const { currentUser } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async (e) => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser(null)
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setErr(false);
        });
      }
    } catch (error) {
      console.log("Error occurred", error)
      setErr(true);
    }

  }

  const handleChatUser = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if(!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: []})

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId+'.userInfo'] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+'.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId+'.userInfo'] : {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+'.date']: serverTimestamp()
        })
      }

      setUser(null)
      setUsername('')

    } catch (error) {

    }


  }


  return (
    <div className='sidebarInput'>
      <input type="text" placeholder='Search contact' onChange={e => setUsername(e.target.value)} onKeyUp={handleSearch} value={username} />
      {username && (
        <>
          {user && (
            <div className="searchContainer">
              <div className="users" onClick={handleChatUser}>
                <img src={user.photoURL} alt="" />
                <h3>{user.displayName}</h3>
              </div>
            </div>
          )}
          {err && (
            <div className="searchContainer">
              <h3>User Not Found</h3>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Input