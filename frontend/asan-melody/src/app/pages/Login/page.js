'use client'
import React , {useState , useEffect} from 'react'
import {FaUser , FaLock} from 'react-icons/fa';
import { MdHome , MdClose } from 'react-icons/md';

import loginAPI from '@/app/api/login';

import style from '../../Style/login.css'

export default function Login() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [errorHappened,setErrorHappend] = useState(false) 
    
    useEffect(() => {
        if(localStorage.getItem('authToken')){
            window.location.href = '/pages/Error/401'
        }
    } ,[])
    
    const handleErrorHappend = () => {
        setErrorHappend(!errorHappened)
    }
    
    const handleErrorPages = (err) => {

        setError('error happend please try again later!')
        if (err.response && err.response.status){
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }else if(err.response.status === 401){
                window.location.href = '/pages/Error/401';
                setError(err.response.data.metadata.messageEng)
            }else if(err.response.status === 404){
                window.location.href = '/pages/Error/404';
                setError(err.response.data.metadata.messageEng)
            }else if(err.response.status === 500){
                window.location.href = '/pages/Error/500';
                setError(err.response.data.metadata.messageEng)
            }
        }
        handleErrorHappend()
        setLoading(false)
        
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        loginAPI({username:username,password:password},(result,err) => {
            if(err){
                handleErrorPages(err)
            }else{
                localStorage.setItem('authToken',result.data.body.data.token)
                window.location.href = '/'
            }

        })
    }
    return(
        <React.Fragment>
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
            {
                errorHappened?
                (
                    <div className='error-message-page-container'>
                        <div className='error-message-container'>
                            <div className='error-icon-container'>
                                <div className='error-close-icon-container' onClick={handleErrorHappend}>
                                    <MdClose className='error-close-icon'></MdClose>
                                </div>
                                <div className='error-close-icon-container' onClick={() => {window.location.href='/'}}>
                                    <MdHome className='error-close-icon'></MdHome>
                                </div>
                            </div>
                            <h1>ERROR</h1>
                            <br/>
                            <p>{error}</p>
                        </div>  
                    </div>
                ):
                (
                    <div/>
                )
            }
        </React.Fragment>
    )
}