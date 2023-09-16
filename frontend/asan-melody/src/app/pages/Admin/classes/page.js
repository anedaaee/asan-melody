'use client'
import React , {useState , useEffect} from 'react'

import { FaUserPlus } from 'react-icons/fa'
import { MdAdd , MdClose , MdPermMedia , MdHome} from 'react-icons/md'

import style from '@/app/Style/classes.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'
import Footer from '@/app/View/Components/Footer'


import { IMG_KEY } from '../../../../../config'

import getClassesAPI from '@/app/api/getClassesAPI'
import organAPI from '@/app/api/organAPI'
import deleteClassAPI from '@/app/api/deleteClassAPI'
import refactoreClassAPI from '@/app/api/refactoreClassAPI'
const COLUMNS = [
    {
        Header:'#'
    },
    {
        Header:'Name'
    },
    {
        Header:'Description'
    },
    {
        Header:'Teacher'
    },
    {
        Header:'Price'
    },
    {
        Header:'Number'
    },
    {
        Header:'Organ'
    },
    {
        Header:'Image'
    },
    {
        Header:'Address'
    },
    {
        Header:'Is Active'
    }
]

export default function Organ() {

    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [classes,setClasses] = useState([])
    const [organs,setOrgans] = useState([])
    const [showImage,setShowImage] = useState(false)
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
        if(localStorage.getItem('userData')){
            if(JSON.parse(localStorage.getItem('userData')).role !== 'manager'){
                window.location.href = '/pages/Error/AccessDenied'
            }
        }
        async function fetch(){
            try{
                setUserData(JSON.parse(localStorage.getItem('userData')))
                
                let result = await getClassesAPI()

                setClasses(result)

                result = await organAPI()

                setOrgans(result.organs)

                setLoading(false)
            }catch(err){
                handleErrorPages(err)
            }
        }

        fetch()

    },[])

    const clickRow = (key,val) => {
        try{
            setVisible((prevVisibleRows) => ({
                [!key] : false,
                [key]: !prevVisibleRows[key] || false
            }))

            
            async function fetch(){
                try{

                }catch(err){
                    handleErrorPages(err)
                }
            }
            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    }   

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; 
    };

    const getImage = async (profile) =>{
        try{
            setImage(profile)
            setShowImage(true)
        }catch(err){
            handleErrorPages(err)
        }
    }

    const closeImage = async () =>{
        try{
            setImage('')
            setShowImage(false)
        }catch(err){
            handleErrorPages(err)
        }
    } 

    const deleteClass = (val) => {
        try{            
            async function fetch(){
                try{
                    await deleteClassAPI({classId:val.class_id})
                    await window.location.reload()
                }catch(err){
                    handleErrorPages(err)
                }
            }
            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    }

    const refactoreClass = (val) => {
        try{
            async function fetch(){
                try{
                    await refactoreClassAPI({classId:val.class_id})
                    await window.location.reload()
                }catch(err){throw err}
            }
            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    }
    return(
        <React.Fragment>
            <div className='admin-page' >
                {
                    loading? 
                    (
                        <p>loading</p>
                    )
                    :
                    (
                        <div>
                            <div>
                                {
                                    showImage?(
                                        <div className='image'>  
                                            <MdClose className='close-icon' onClick={() => closeImage()}/>
                                            <img src={`${IMG_KEY}${image}`} onError={(e) => handleImageError(e)} alt={image}></img>
                                        </div>
                                    ):(
                                        <div/>
                                    )
                                }
                            </div>
                            <Header userData={userData}></Header>
                            <div className='page-container'>
                                <Navigation></Navigation>
                                <div className='organ-table-container'>                                
                                    <table className='organ-table'>
                                        <tr>
                                            {
                                                COLUMNS.map((val) => {
                                                    return(
                                                        <th>{val.Header}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        {
                                            classes.map((val,key) => {
                                                return(
                                                    <React.Fragment>
                                                        <tr key={key} onClick={() => clickRow(val,key)}>
                                                            <td>{key+1}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.description}</td>
                                                            <td>{val.teacher}</td>
                                                            <td>{val.price}</td>
                                                            <td>{val.number}</td>
                                                            <td>
                                                                {
                                                                    organs.map((organ) => {
                                                                        if (organ.id === val.organ){
                                                                            return(
                                                                                organ.name
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </td>
                                                            <td>
                                                                <img className='table-image' src={`${IMG_KEY}${val.image}`} onClick={ () => getImage(val.image)} alt={val.image} onError={(e) => handleImageError(e)}/>
                                                            </td>
                                                            <td>{val.address}</td>
                                                            <td>{val.isActive}</td>
                                                            <td>
                                                            {
                                                                (val.isActive === 1)?
                                                                (

                                                                    <input type='button' value={'DELETE'} className='table-input-btn' onClick={() => deleteClass(val)}/>
                                                                ):
                                                                (
                                                                    <input type='button' value={'REFACTORE'} className='table-input-btn' onClick={() => refactoreClass(val)}/>
                                                                )
                                                                
                                                            }
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        <a className='add-link' href='/pages/Admin/classes/addClass'>
                                            <label htmlFor='add'>
                                                <MdAdd className='add-icon'/>
                                            </label>
                                            <p className='add-btn' id='add'>ADD NEW</p>
                                        </a>
                                    </table>
                                </div>
                            </div>
                            <Footer></Footer>
                        </div>
                    )
                }
                <p id='error'>{error}</p>
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