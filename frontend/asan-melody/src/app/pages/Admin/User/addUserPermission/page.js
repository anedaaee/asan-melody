'use client'
import React,{useEffect , useState} from 'react'
import {FaUser , FaLock ,FaMailBulk , FaUserAlt , FaPhone } from 'react-icons/fa';
import { MdHome , MdClose } from 'react-icons/md';

import addUserPermissionAPI from '@/app/api/addUserPermissionAPI';
import getPermissions from '@/app/api/getPermissionsAPI';
import getUsersAPI from '@/app/api/getUsersAPI';
import organAPI from '@/app/api/organAPI';

import style from '@/app/Style/addUserPermission.css'


export default function addPermission() {

    const [username,setUsername] = useState('')
    const [permission,setPermission] = useState('')
    const [organ,setOrgan] = useState('')


    const [users,setUsers] = useState([])
    const [permissions,setPermissions] = useState([])
    const [organs,setOrgans] = useState([])
    const [error,setError] = useState('')
    const [errorHappened,setErrorHappend] = useState(false) 
    
    const handleErrorHappend = () => {
        setErrorHappend(!errorHappened)
    }

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            window.location.href = '/pages/Error/401'
        }
        if(localStorage.getItem('userData')){
            if(JSON.parse(localStorage.getItem('userData')).role !== 'manager'){
                window.location.href = '/pages/Error/AccessDenied'
            }
        }
        try{
            async function fetch() {
                try{
                    let result = await getPermissions()
        
                    setPermissions(result)

                    result = await getUsersAPI()

                    setUsers(result)
                    
                    result = await organAPI()

                    setOrgans(result.organs)
                }catch(err){
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
            }

            fetch()
        }catch(err){
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


    } ,[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addUserPermissionAPI({username:username,permission:permission,organ:organ})
            window.location.href = '/pages/Admin'
        }catch(err){
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
    }

    return(
        <React.Fragment>
            <div className='permission-container'>
                <div className='permission-picture'>
                    <p>Welcome to asan melody website</p>

                </div>
                <div className='permission-controll'>
                    <div className='permission-froms'>
                        <p className='header-text'>add user permission</p>
                        <form>
                            <div className='form' id='username'>
                                <label htmlFor='username'>
                                    <FaUser className='icon'/>
                                </label>
                                <select id='username' onChange={(e) => setUsername(e.target.value)} required>
                                    <option value='select-user' disabled selected>Select an User</option>
                                    {
                                        users.map((value,key) => {
                                            return(
                                                <option value={value.username}> {value.username}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form' id='permission'>
                                <label htmlFor='permission'>
                                    <FaLock className='icon'/>
                                </label>
                                <select id='permission' onChange={(e) => setPermission(e.target.value)} required >
                                    <option value='select-permission' disabled selected>Select an Permission</option>
                                    {
                                        permissions.map((value,key) => {
                                            return(
                                                <option value={value.permission}> {value.permission}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form' id='organ'>
                                <label htmlFor='organ'>
                                    <FaUserAlt className='icon'/>
                                </label>
                                <select id='organ' onChange={(e) => setOrgan(e.target.value)} required>
                                    <option value='select-organ' disabled selected>Select an Organ</option>
                                    {
                                        organs.map((value,key) => {
                                            return(
                                                <option value={value.id}> {value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <button type="submit" onClick={handleSubmit}>submit</button>
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