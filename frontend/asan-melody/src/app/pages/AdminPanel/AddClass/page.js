'use client'
import React,{useEffect , useState} from 'react'
import {FaUser } from 'react-icons/fa';
import { MdFactory ,MdClass ,MdInfo , MdMoney , MdHome , MdNumbers , MdImage , MdClose} from 'react-icons/md';

import getOrgansAdminAPI from '@/app/api/getOrgansAdminAPI';
import getUserPermisionbyPermissionAndOrganAPI from '@/app/api/getUserPermisionbyPermissionAndOrganAPI';
import addClassAPI from '@/app/api/addClassAPI';
import getUserDistinctPermisionAPI from "@/app/api/getUserDistinctPermissionAPI"

import style from '@/app/Style/addClass.css'

export default function addClass() {

    const [organSelected , setOrganSelected] = useState(false)
    const [organ,setOrgan] = useState('')
    const [organs,setOrgans] = useState([])
    const [loading,setLoading] = useState(true)
    const [teachers,setTeachers] = useState('')

    const [name,setName] = useState('')
    const [description,setDesctiprion] = useState('')
    const [teacher,setTeacher] = useState('')
    const [price,setPrice] = useState('')
    const [address,setAddress] = useState('')
    const [number,setNumber] = useState('')
    const [image,setImage] = useState('')
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
        try{
            async function fetch(){
                let permission = await getUserDistinctPermisionAPI(JSON.parse(localStorage.getItem('userData')).username)
                if(!permission.teacher){
                    window.location.href = '/pages/Error/AccessDenied'
                }
                try{
                    let result =await  getOrgansAdminAPI()
                    
                    await setOrgans(result)
    
                    await setLoading(false)
                }catch(err){
                    handleErrorPages(err)
                }
            }

            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addClassAPI({image:image,teacher:teacher,name:name,description:description,price:price,address:address,organ:organ,number:number})
            window.location.href = '/pages/Admin/classes'
        }catch(err){
            handleErrorPages(err)
        }
        
    }

    const handleSubmitOrganSelect = async (e) => {
        try{
            e.preventDefault(); 
    
            if(organ !== ''){
                let result = await getUserPermisionbyPermissionAndOrganAPI({permission:'teacher' , organ:organ})
                
                await setTeachers(result)
                
                await setOrganSelected(true)
            }
        }catch(err){
            handleErrorPages(err)
        }
    }

    return(
        <React.Fragment>
            <div className='class-container'>
                {
                    loading?
                    (
                        <p>loading...</p>
                    ):
                    (
                        <React.Fragment>
                            <div className='class-picture'>
                                <p>Welcome to asan melody website</p>

                            </div>
                            <div className='class-controll'>
                                {
                                    organSelected?
                                    (
                                        <div className='froms'>
                                            <p className='header-text'>add class</p>
                                            <form>
                                                <div className='form'>
                                                    <label htmlFor='name'>
                                                        <MdClass className='icon'/>
                                                    </label>
                                                    <input type='text' id='name'  placeholder='name' value={name} onChange={(e) => setName(e.target.value)} required minLength={3}/>
                                                </div>
                                                <div className='form' id='description'>
                                                    <label htmlFor='description'>
                                                        <MdInfo className='icon'/>
                                                    </label>
                                                    <input type='text' id='description' placeholder='description' value={description} onChange={(e) => setDesctiprion(e.target.value)} required minLength={3}/>
                                                </div>
                                                <div className='form'>
                                                    <label htmlFor='teacher-select'>
                                                        <FaUser className='icon'/>
                                                    </label>
                                                    <select id='teacher-select'  onChange={(e) => setTeacher(e.target.value)} required>
                                                        <option value='select-teacher' disabled selected>Select an Teacher</option>
                                                    {
                                                        teachers.map((teacher) => {
                                                            return(
                                                                <option value={teacher.username}>{teacher.username}</option>
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                </div>
                                                <div className='form'>
                                                    <label htmlFor='price'>
                                                        <MdMoney className='icon'/>
                                                    </label>
                                                    <input type='number' id='price'  placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} required minLength={3}/>
                                                </div>
                                                <div className='form'>
                                                    <label htmlFor='address'>
                                                        <MdHome className='icon'/>
                                                    </label>
                                                    <input type='text' id='address'  placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} required minLength={3}/>
                                                </div>
                                                <div className='form'>
                                                    <label htmlFor='number'>
                                                        <MdNumbers className='icon'/>
                                                    </label>
                                                    <input type='number' id='number'  placeholder='number' value={number} onChange={(e) => setNumber(e.target.value)} required minLength={3}/>
                                                </div>
                                                <div className='form-file1' id='type'>
                                                    <label htmlFor='image-input'>
                                                        <MdImage className='file-icon'/>
                                                    </label>
                                                    <input type='file' id='image-input'  onChange={(e) => setImage(e.target.files[0])} required minLength={3}/>
                                                </div>
                                                <button type="submit" onClick={handleSubmit}>add</button>
                                                <p id='error'>{error}</p>
                                            </form>
                                        </div>
                                    ):(
                                        <div className='froms'>
                                            <p className='header-text'>select organ</p>
                                            <form>
                                                <div className='form' id='organ'>
                                                    <label htmlFor='organ-select'>
                                                        <MdFactory className='icon'/>
                                                    </label>
                                                    <select id='organ-select' onChange={(e) => setOrgan(e.target.value)} required>
                                                        <option value='organ-teacher' disabled selected>Select an organ</option>
                                                    {
                                                        organs.map((organ) => {
                                                            return(
                                                                <option value={organ.id}>{organ.name}</option>
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                </div>
                                                <button type="submit" onClick={handleSubmitOrganSelect}>add</button>
                                                <p id='error'>{error}</p>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        </React.Fragment>
                    )
                }

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