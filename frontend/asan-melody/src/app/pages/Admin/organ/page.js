'use client'
import React , {useState , useEffect} from 'react'

import { FaUserPlus } from 'react-icons/fa'
import { MdAdd , MdClose , MdPermMedia} from 'react-icons/md'

import style from '../../../Style/organ.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'
import Footer from '@/app/View/Components/Footer'

import organAPI from '@/app/api/organAPI'
import getUserPermisionbyPermissionAndOrganAPI from '@/app/api/getUserPermisionbyPermissionAndOrganAPI'
import updateOrganAPI from '@/app/api/updataOrganAPI'
import deleteOrganAPI from '@/app/api/deleteOrganAPI'
import refactorOrganAPI from '@/app/api/refactorOrganAPI'
import updateOrganProfileAPI from '@/app/api/updateOrganProfileAPI'
import updateOrganBackgroundAPI from '@/app/api/updateOrganBackground'

import { IMG_KEY } from '../../../../../config'
const COLUMNS = [
    {
        Header:'#'
    },
    {
        Header:'Name'
    },
    {
        Header:'Manager'
    },
    {
        Header:'Address'
    },
    {
        Header:'Phone'
    },
    {
        Header:'Description'
    },
    {
        Header:'Type'
    },
    {
        Header:'Is active'
    },
    {
        Header:'Profile'
    },
    {
        Header:'Background'
    },
]

export default function Organ() {

    const [error,setError] = useState('')
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [organs,setOrgans] = useState([])
    const [visible,setVisible] = useState({})
    const [name,setName] = useState('')
    const [manager,setManager] = useState('')
    const [address,setAdress] = useState('')
    const [phone,setPhone] = useState('')
    const [description,setDiscription] = useState('')
    const [type,setType] = useState('')
    const [rowLoading , setRowLoading] = useState(true)
    const [managers,setManagers] = useState([])
    const [profileImage,setProfileImage] = useState('')
    const [showImage,setShowImage] = useState(false)
    
    useEffect(() => {
        async function fetch(){
            try{
                await setUserData(JSON.parse(localStorage.getItem('userData')))
                
                let result = await organAPI()
                
                await setOrgans(result.organs)

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
            setName(val.name)
            setManager(val.manager)
            setAdress(val.address)
            setPhone(val.phone)
            setDiscription(val.description)
            setType(val.type)
            
            async function fetch(organ){
                try{
                    let managersData = await getUserPermisionbyPermissionAndOrganAPI({permission:'manager',organ:organ})
        
                    await setManagers(managersData)
                    
                    await setRowLoading(false)
                }catch(err){throw err}
            }
            fetch(val.id)
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }   

    const updateOrgan = (val) => {
        try{
            async function fetch(){
                try{
                    await updateOrganAPI({name:name,manager:manager,address:address,phone:phone,description:description,id:val.id})
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

    const deleteOrgan = (val) => {
        try{            
            async function fetch(){
                try{
                    await deleteOrganAPI(val.id)
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

    const refactoreOrgan = (val) => {
        try{
            async function fetch(){
                try{
                    await refactorOrganAPI(val.id)
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

    const getImage = async (profile) =>{
        try{
            await setProfileImage(profile)
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
            await setProfileImage('')
            await setShowImage(false)
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    } 
    
    const handleProfileUdate = async (file,id) => {
        try{
            await updateOrganProfileAPI(file,id)
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }   

    const handleBackgroundUdate = async (file,id) => {
        try{
            await updateOrganBackgroundAPI(file,id)
            window.location.reload()
        }catch(err){
            alert(err);
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

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
                                        <MdClose className='close-icon' onClick={() => closeImage()} />
                                        <img src={`${IMG_KEY}${profileImage}`} onError={(e) => handleImageError(e)} alt={profileImage}></img>
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
                                            COLUMNS.map((column) => {
                                                return(
                                                    <th>{column.Header}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                    {
                                        organs.map((val,key)=> {
                                            return (
                                                <React.Fragment>
                                                    <tr key={key} onClick={() => clickRow(key,val)}>
                                                        <td>{val.id}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.manager}</td>
                                                        <td>{val.address}</td>
                                                        <td>{val.phone}</td>
                                                        <td>{val.description}</td>
                                                        <td>{val.type}</td>
                                                        <td>{val.isActive}</td>
                                                        <td>
                                                            <img className='table-image' src={`${IMG_KEY}${val.profile_image}`} onClick={ () => getImage(val.profile_image)} alt={val.profile_image} onError={(e) => handleImageError(e)}/>
                                                        </td>
                                                        <td>
                                                            <img className='table-image' src={`${IMG_KEY}${val.background_image}`} onClick={ () => getImage(val.background_image)} alt={val.background_image} onError={(e) => handleImageError(e)}/>
                                                        </td>
                                                    </tr>
                                                    {
                                                        visible[key] ? (
                                                            rowLoading?(
                                                                <tr className='update-row'> 
                                                                    <td>loading...</td>
                                                                </tr>
                                                            ):(
                                                                <tr key={key} className='update-row'>
                                                                    <td>...</td>
                                                                    <td>
                                                                        <input type='text' value={name} className='table-input' onChange={(e) => setName(e.target.value)} minLength={3} required/>
                                                                    </td>
                                                                    <td>
                                                                        <select name='manager-select' className='table-input' onChange={(e) => setManager(e.target.value)} required>
                                                                            <option value='select-manager' disabled selected>Select an Manager</option>
                                                                            {
                                                                                managers.map((manager) => (
                                                                                    <option selected>{manager.username}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type='text' value={address} className='table-input' onChange={(e) => setAdress(e.target.value)} minLength={3} required/>
                                                                    </td>
                                                                    <td>
                                                                        <input type='text' value={phone} className='table-input' onChange={(e) => setPhone(e.target.value)} minLength={3} required/>
                                                                    </td>
                                                                    <td>
                                                                        <input type='text' value={description} className='table-input' onChange={(e) => setDiscription(e.target.value)} minLength={3} required/>
                                                                    </td>
                                                                    <td>
                                                                        {val.type}
                                                                    </td>
                                                                    <td>   
                                                                        {
                                                                            (val.isActive === 1)?
                                                                            (

                                                                                <input type='button' value={'DELETE'} className='table-input-btn' onClick={() => deleteOrgan(val)}/>
                                                                            ):
                                                                            (
                                                                                <input type='button' value={'REFACTORE'} className='table-input-btn' onClick={() => refactoreOrgan(val)}/>
                                                                            )
                                                                        }
                                                                    </td>

                                                                    <td>
                                                                        <label htmlFor='new-profile'>
                                                                            <FaUserPlus className='file-icon1'/>
                                                                        </label>
                                                                        <input type='file' id='new-profile' className='table-input-btn2'onChange={(e) => handleProfileUdate(e.target.files[0],val.id)}/>
                                                                    </td>
                                                                    <td>
                                                                        <label htmlFor='new-background'>
                                                                            <MdPermMedia className='file-icon2'/>
                                                                        </label>
                                                                        <input type='file' id='new-background' className='table-input-btn2' onChange={(e) => handleBackgroundUdate(e.target.files[0],val.id) }/>
                                                                    </td>
                                                                    <td>
                                                                        <input type='button' value={'UPDATE'} className='table-input-btn' onClick={() => updateOrgan(val)}/>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        ): (
                                                            <tr/>
                                                            )
                                                    }
            
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <a className='add-link' href='/pages/Admin/organ/AddOrgan'>
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
    )
}