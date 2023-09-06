'use client'
import React , {useState , useEffect} from 'react'

import { FaUserPlus } from 'react-icons/fa'
import { MdAdd , MdClose , MdPermMedia} from 'react-icons/md'

import style from '@/app/Style/classes.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'



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

    const [error,setError] = useState('')
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [classes,setClasses] = useState([])
    const [organs,setOrgans] = useState([])
    const [showImage,setShowImage] = useState(false)
    const [image,setImage] = useState('')

    useEffect(() => {
        async function fetch(){
            try{
                await setUserData(JSON.parse(localStorage.getItem('userData')))
                
                let result = await getClassesAPI()

                setClasses(result)

                result = await organAPI()

                setOrgans(result.organs)

                await setLoading(false)
            }catch(err){
                setError('error happend please try again later!')
                if(err.response.status === 400){
                    setError(err.response.data.metadata.messageEng)
                }
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

                }catch(err){throw err}
            }
            fetch()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }   

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

    const getImage = async (profile) =>{
        try{
            await setImage(profile)
            await setShowImage(true)
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const closeImage = async () =>{
        try{
            await setImage('')
            await setShowImage(false)
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    } 

    const deleteClass = (val) => {
        try{            
            async function fetch(){
                try{
                    await deleteClassAPI({classId:val.class_id})
                    await window.location.reload()
                }catch(err){throw err}
            }
            fetch()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
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
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }
    return(

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
                    </div>
                )
            }
            <p id='error'>{error}</p>
        </div>
    )
}