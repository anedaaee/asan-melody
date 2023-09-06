'use client'
import React , {useState , useEffect} from 'react'
import {FaUser , FaLock} from 'react-icons/fa';


import loginAPI from '@/app/api/login';

import style from '../../Style/login.css'

export default function Login() {

    const [error,setError] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        loginAPI({username:username,password:password},(result,err) => {
            if(err){
                setError('error happend please try again later!')
                if(err.response.status === 400){
                    setError(err.response.data.metadata.messageEng)
                }
            }else{
                localStorage.setItem('authToken',result.data.body.data.token)
                window.location.href = '/'
            }

        })
    }
    return(
        <div className='login-container'>
            <div className='login-picture'>
                <p>Welcome to asan melody website</p>

            </div>
            <div className='login-controll'>
                <div className='login-froms'>
                    <p className='header-text'>user login</p>
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
                        <button type="submit" onClick={handleSubmit}>Login</button>
                        <p id='register'>Don't have an account? <a href='/pages/Signup'>signup here</a></p>
                        <p id='error'>{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}