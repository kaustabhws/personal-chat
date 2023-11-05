import React, { useContext, useEffect } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setTimeout(() => {
                navigate('/')
            }, 3000);

        } catch (error) {
            if (error.code.includes('auth/invalid-login-credentials')) {
                toast.error('Invalid login credentials', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    useEffect(() => {
        if (!currentUser) {
            toast.info('You are not logged in', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [])


    return (
        <div className='authContainer'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div class='login-box'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div class='user-box'>
                        <input type='email' name='' required='' />
                        <label>Email</label>
                    </div>
                    <div class='user-box'>
                        <input type='password' name='' required='' />
                        <label>Password</label>
                    </div>
                    <div className='submitBtn'>
                        <button type='submit'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </div>
                </form>
                <div className='footerContainer'>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login