'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { FaUser } from "react-icons/fa"
import { MdCheck ,  MdClose , MdGridOn , MdSettings , MdAdd } from "react-icons/md"

import style from '@/app/Style/AdminPanel.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"


import getClassesAdminAPI from "@/app/api/getClassesAdminAPI"
import getPurchaseAdminAPI from "@/app/api/getPurchasesAdminAPI"
import getOrgansAdminAPI from "@/app/api/getOrgansAdminAPI"
import deleteClassAdminAPI from "@/app/api/deleteClassAdminAPI"
import refactoreClassAdminAPI from "@/app/api/refactoreClassAdminAPI"
import admitAdminOrganAPI from "@/app/api/admitAdminOrganAPI"

const COLUMNS_purchase = [
    {
        Header:'#'
    },
    {
        Header:'User'
    },
    {
        Header:'Class'
    },
    {
        Header:'Date'
    },
    {
        Header:'Receipt'
    },
    {
        Header:'Admit'
    },
]

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

export default function AdminPanel() {
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [error,setError] = useState('')
    const [setting , setSetting] = useState(true)
    const [post , setPost] = useState(false)
    const [classes , setClasses] = useState([])
    const [organs , setOrgans] = useState([])
    const [purchases , setPurchases] = useState([])
    const [image,setImage] = useState('')
    const [showImage ,setShowImage] = useState(false)

    useEffect(() => {
        try{
            async function fetch() {
                try{

                    setAuthToken(localStorage.getItem('authToken'))
                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    
                    let classes = await getClassesAdminAPI()
                    setClasses(classes)
                    
                    let organs = await getOrgansAdminAPI()
                    setOrgans(organs)
                    
                    let purchase = await getPurchaseAdminAPI()
                    setPurchases(purchase)

                    setLoading(false)

                }catch(err){throw err}
            }

            fetch()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    } , [])

    const pageSection = async (where) => {
        try{
            if (where === 1){
                setSetting(false)
                setPost(true)
            }else if (where === 2){
                setPost(false)
                setSetting(true)
            }
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; 
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
                    await deleteClassAdminAPI({classId:val.class_id})
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
                    await refactoreClassAdminAPI({classId:val.class_id})
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

    const admit = async(val) => {
        try{
            await admitAdminOrganAPI({user:val.user,class:val.class})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const showOrgan = async(id,organ) => {
        try{
            window.location.href = `/pages/AdminPanel/showOrgan?id=${id}&organ=${JSON.stringify(organ)}`
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            } 
        }
    }
    return(
        <div className='purchase-page'>
        {
            loading?
            (
                <h1>loading...</h1>
            ):
            (
                <React.Fragment>
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
                    {
                        
                        (authToken) ?
                        (
                            <LoginHeader></LoginHeader>
                        )
                        :
                        (<Header></Header>)
                    }
                    <section className="admin-panel-page">
                        <div className="selector">
                            <div className="icon-container">
                                <MdGridOn onClick={() => pageSection(1)} className="icon" style={post? {color:'5d6268'} : {color:'#e9d4c1'}}></MdGridOn>
                            </div>
                            <div className="icon-container">
                                <MdSettings onClick={() => pageSection(2)} className="icon" style={setting? {color:'5d6268'} : {color:'#e9d4c1'}}></MdSettings>
                            </div>
                        </div>
                    </section>
                    <section className="setting-container" style={setting? {display:"block"} : {display:'none'}}>
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
                                                <tr key={key}>
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
                        <div className='organ-table-container'>                                
                            <table className='organ-table'>
                                <tr>
                                    {
                                        COLUMNS_purchase.map((val) => (
                                            <th>{val.Header}</th>
                                        ))
                                    }
                                </tr>
                                {
                                    purchases.map((val,key)=> {
                                        
                                        const date = new Date(val.date);

                                        const year = date.getFullYear();
                                        const month = date.getMonth() + 1;
                                        const day = date.getDate();

                                        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
                                        return(
                                            <tr>
                                                <td>{key}</td>
                                                <td>{val.user}</td>
                                                <td>{val.class}</td>
                                                <td>{formattedDate}</td>
                                                <td>
                                                    <img className='table-image' src={`${IMG_KEY}${val.receipt}`} onClick={ () => getImage(val.receipt)} alt={`${key} receipt`} onError={(e) => handleImageError(e)}/>   
                                                </td>
                                                    {
                                                        (val.admit===1)?
                                                        (
                                                            <td>
                                                                <MdCheck/>
                                                            </td>
                                                        ):
                                                        (
                                                            <td>
                                                                <input type='button' value={'ADMIT'} className='table-input-btn' onClick={() => admit(val)}/>
                                                            </td>
                                                        )
                                                    }
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className="post-container" style={post? {display:"block"} : {display:'none'}}>
                        {
                            organs.map((organ,key) => {

                                return (
                                    <div className="organ-item" onClick={()=>showOrgan(organ.id , organ)}>
                                        <img className='organ-background-image' src={`${IMG_KEY}${organ.background_image}`} alt={organ.name + 'background'} onError={(e) => handleImageError(e)}/>
                                        <img className='organ-profile-image' src={`${IMG_KEY}${organ.profile_image}`} onClick={ () => getImage(organ.profile_image)} alt={organ.name + 'profile'} onError={(e) => handleImageError(e)}/>
                                        <div className="organ-info">
                                            <h1>{organ.name}</h1>
                                            <h2>{organ.description}</h2>
                                            <h3>Owner: {organ.manager}</h3>
                                            <br/>
                                            <hr/>
                                            <br/>
                                            <h4>Phone : {organ.phone}</h4>
                                            <h4>Address : {organ.address}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </React.Fragment>
            )
        }
    </div>
    )
}