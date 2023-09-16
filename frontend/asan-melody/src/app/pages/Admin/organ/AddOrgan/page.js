'use client'
import React , {useState , useEffect} from 'react'
import {FaUser  ,FaUserPlus, FaHome  , FaPhone} from 'react-icons/fa';
import { MdFactory ,MdPermMedia,MdFactCheck , MdCheckCircle , MdHome , MdClose} from 'react-icons/md';


import getUsersAPI from '@/app/api/getUsersAPI';
import addOrganAPI from '@/app/api/addOrganAPI';

import style from '../../../../Style/addOrgan.css'

export default function AddOrgan() {

    const [name,setName] = useState('')
    const [manager,setManager] = useState('')
    const [address,setAdress] = useState('')
    const [phone,setPhone] = useState('')
    const [description,setDiscription] = useState('')
    const [type,setType] = useState('')
    const [managers,setManagers] = useState([])
    const [profile , setProfile] = useState({})
    const [background , setBackground] = useState({})
    const [error,setError] = useState('')
    const [errorHappened,setErrorHappend] = useState(false) 

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
            async function fetch () {
                try{
                    let result = await getUsersAPI()
                    await setManagers(result)
                }catch(err){
                    handleErrorPages(err)
                }
            }
    
            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    } ,[])

    const handleSubmit = (e) =>{
        try{

            async function fetch(){
                try{    
                    await addOrganAPI({profile:profile,background:background,name:name,address:address,manager:manager,phone:phone,type:type,desctiption:description})
                    window.location.href = '/pages/Admin'
                }catch(err){throw err}
            }
            e.preventDefault();
            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    }
    return(
        <React.Fragment>
            <div className='organ-container'>
                <div className='organ-picture'></div>
                <div className='organ-controll'>
                    <div className='organ-froms'>
                        <p className='header-text'>NEW ORGANIZATION</p>
                        <form>
                            <div className='form' id='name'>
                                <label htmlFor='name-input'>
                                    <MdFactory className='icon'/>
                                </label>
                                <input type='text' id='name-input'  placeholder='name' value={name} onChange={(e) => setName(e.target.value)} required minLength={3}/>
                            </div>
                            <div className='form' id='manager'>
                                <label htmlFor='manager-input'>
                                    <FaUser className='icon'/>
                                </label>
                                <select name='manager-input' id='manager-input' onChange={(e) => setManager(e.target.value)} required>
                                    <option value='select-manager' disabled selected>Select an Manager</option>
                                    {
                                        managers.map((manager) => {
                                            return (
                                                <option selected>{manager.username}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form' id='address'>
                                <label htmlFor='address-input'>
                                    <FaHome className='icon'/>
                                </label>
                                <input type='text'  id='address-input' placeholder='address' value={address} onChange={(e) => setAdress(e.target.value)} required minLength={3}/>
                            </div>
                            <div className='form' id='phone'>
                                <label htmlFor='phone-input'>
                                    <FaPhone className='icon'/>
                                </label>
                                <input type='number'  id='phone-input' placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={3}/>
                            </div>
                            <div className='form' id='description'>
                                <label htmlFor='description-input'>
                                    <MdFactCheck className='icon'/>
                                </label>
                                <input type='text'  id='description-input' placeholder='description' value={description} onChange={(e) => setDiscription(e.target.value)} required minLength={3}/>
                            </div>
                            <div className='form' id='type'>
                                <label htmlFor='type-input'>
                                    <MdCheckCircle className='icon'/>
                                </label>
                                <select id='type-input' onChange={(e) => setType(e.target.value)} required>
                                    <option selected>association</option>
                                    <option>group</option>
                                    <option>academy</option>
                                </select>
                            </div>
                            <div className='file-upload-container'>
                                <div className='form-file1' id='type'>
                                    <label htmlFor='profile-input'>
                                        <FaUserPlus className='file-icon'/>
                                    </label>
                                    <input type='file' id='profile-input'  onChange={(e) => setProfile(e.target.files[0])} required minLength={3}/>
                                </div>
                                <div className='form-file2' id='type'>
                                    <label htmlFor='background-input'>
                                        <MdPermMedia className='file-icon'/>
                                    </label>
                                    <input type='file' id='background-input'  onChange={(e) => setBackground(e.target.files[0])} required minLength={3}/>
                                </div>
                            </div>
                            <button type="submit" onClick={handleSubmit}>ADD</button>
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