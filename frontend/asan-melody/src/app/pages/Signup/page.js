'use client'
import React,{useEffect , useState} from 'react'
import {FaUser , FaLock ,FaMailBulk , FaUserAlt , FaPhone } from 'react-icons/fa';

import signupAPI from '@/app/api/signup';

import style from '../../Style/signup.css'

export default function Signup() {

    const [error,setError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')

    // useEffect(() => {
    //     if(localStorage.getItem('authToken') !== null){
    //         //window.location.href = '/'
    //     }
    // })

    const handleSubmit = (e) => {
        e.preventDefault();

        signupAPI({username:username,password:password,firstName:firstname,lastName:lastname,email:email,phone:phone} ,(result,err) => {
            if(err){
                setError('error happend please try again later!')
                if(err.response.status === 400){
                    setError(err.response.data.metadata.messageEng)
                }
            }else{
                window.location.href = '/'
            }
        })
    }

    return(
        <div className='signup-container'>
            <div className='signup-picture'>
                <p>Welcome to asan melody website</p>

            </div>
            <div className='signup-controll'>
                <div className='signup-froms'>
                    <p className='header-text'>user signup</p>
                    <form>
                        <div className='form' id='username'>
                            <label>
                                <FaUser className='icon'/>
                            </label>
                            <input type='text'  placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3}/>
                        </div>
                        <div className='form' id='password'>
                            <label>
                                <FaLock className='icon'/>
                            </label>
                            <input type='password'  placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required minLength={3}/>
                        </div>
                        <div className='form' id='firstname'>
                            <label>
                                <FaUserAlt className='icon'/>
                            </label>
                            <input type='text'  placeholder='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} required minLength={3}/>
                        </div>
                        <div className='form' id='lastname'>
                            <label>
                                <FaUserAlt className='icon'/>
                            </label>
                            <input type='text'  placeholder='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} required minLength={3}/>
                        </div>
                        <div className='form' id='email'>
                            <label>
                                <FaMailBulk className='icon'/>
                            </label>
                            <input type='email'  placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required minLength={3}/>
                        </div>
                        <div className='form' id='phone'>
                            <label>
                                <FaPhone className='icon'/>+98 
                            </label>
                            <input type='number'  placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={10} maxLength={10}/>
                        </div>
                        <button type="submit" onClick={handleSubmit}>signup</button>
                        <p id='register'>have an account? <a href='/pages/Login'>login here</a></p>
                        <p id='error'>{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}