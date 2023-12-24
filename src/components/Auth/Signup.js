import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../Firebase/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [cpasswordVisible, setCPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = (field) => {
        if (field === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (field === 'cpassword') {
            setCPasswordVisible(!cpasswordVisible);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const cpassword = e.target.cpassword.value;
        const file = e.target.avatar.files[0];

        try {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            if (password !== cpassword) {
                throw new Error('Passwords do not match');
            }

            const response = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, `${displayName}/${file.name}`);
            await uploadBytesResumable(storageRef, file);

            const downloadURL = await getDownloadURL(storageRef);

            await updateProfile(response.user, {
                displayName,
                photoURL: downloadURL
            });

            await setDoc(doc(db, "users", response.user.uid), {
                uid: response.user.uid,
                displayName,
                email,
                photoURL: downloadURL
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});

            toast.success('Account created successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // Redirect immediately upon success
            navigate('/');

        } catch (error) {
            console.error("Error creating account", error);

            toast.error(error.message || 'Something went wrong', {
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
    };
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
                theme="dark"
            />
            <div className='login-box'>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className='user-box'>
                        <input type='text' name='username' required='' />
                        <label>Username</label>
                    </div>
                    <div className='user-box'>
                        <input type='email' name='email' required='' />
                        <label>Email</label>
                    </div>
                    <div className='user-box'>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            required=''
                        />
                        <i
                            className={`fa-regular fa-eye${passwordVisible ? '-slash' : ''}`}
                            onClick={() => handleTogglePasswordVisibility('password')}
                        ></i>
                        <label>Password</label>
                    </div>
                    <div className='user-box'>
                        <input
                            type={cpasswordVisible ? 'text' : 'password'}
                            name='cpassword'
                            required=''
                        />
                        <i
                            className={`fa-regular fa-eye${cpasswordVisible ? '-slash' : ''}`}
                            onClick={() => handleTogglePasswordVisibility('cpassword')}
                        ></i>
                        <label>Confirm Password</label>
                    </div>
                    <div className="avatar">
                        <label htmlFor="avatar">
                            <i className="fa-solid fa-image fa-2x"></i> Add an avatar
                        </label>
                        <input type="file" id="avatar" />
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
                    <p>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
