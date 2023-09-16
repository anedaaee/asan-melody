'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { MdDone ,  MdClose , MdHome} from "react-icons/md"

import style from '@/app/Style/userInfo.css'

import getUserAPI from "@/app/api/getUser"
import updateUserAPI from "@/app/api/updateUserAPI"

export default function Teacher() {

    const [error,setError] = useState('')
    const [errorHappened,setErrorHappend] = useState(false) 
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [firstName,setFistName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')


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

    const clickSubmit = async () =>{
        try{
            await updateUserAPI({username:userData.username,firstName:firstName,lastName:lastName,email:email,phone:phone,role:userData.role})
            getUserAPI((user,err) => {
                if(err){     
                    handleErrorPages(err)
                }
                localStorage.setItem('userData',JSON.stringify(user.data.body.data))
                window.location.reload()
            })
        }catch(err){
            handleErrorPages(err)
        }
    }
    
    useEffect(() => {
        try{
            setUserData(JSON.parse(localStorage.getItem('userData')))
            setFistName(JSON.parse(localStorage.getItem('userData')).first_name)
            setLastName(JSON.parse(localStorage.getItem('userData')).last_name)
            setEmail(JSON.parse(localStorage.getItem('userData')).email)
            setPhone(JSON.parse(localStorage.getItem('userData')).phone)
            setLoading(false)
        }catch(err){
            handleErrorPages(err)
        }
    } , [])
    return (
        <React.Fragment>
            <div>
                {
                    loading?
                    (
                        <h1>loading...</h1>
                    ):
                    (
                        <div className="user-info-container">
                            <h1>{userData.username}</h1>
                            <h3>{userData.role}</h3>
                            <input className="text-input" type="text" value={firstName} onChange={((e) => setFistName(e.target.value))} required/>
                            <br/>
                            <input className="text-input" type="text" value={lastName} onChange={((e) => setLastName(e.target.value))} required/>
                            <br/>
                            <input className="text-input" type="text" value={email} onChange={((e) => setEmail(e.target.value))} required/>
                            <br/>
                            <input className="text-input" type="number" value={phone} onChange={((e) => setPhone(e.target.value))} required/>
                            <br/>
                            <input className="button-input" type="button" value={'update'} onClick={clickSubmit}/>
                    </div>
                    )
                }
            </div>
            <div>

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
            </div>
        </React.Fragment>
    )
}