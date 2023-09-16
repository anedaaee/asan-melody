'use client'
import React , {useState , useEffect} from 'react'

import style from '../../../Style/usermanagement.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'

import { MdAdd , MdClose , MdHome} from 'react-icons/md'

import getUsersAllDetailAPI from '@/app/api/getUserAllDetailAPI'
import updateUserAPI from '@/app/api/updateUserAPI'
import deleteUserAPI from '@/app/api/deleteUserAPI'
import refactoreUserAPI from '@/app/api/refactorUserAPI'
import getAllUserPermissionsAPI from '@/app/api/getAllUserPermissionsAPI'
import organAPI from '@/app/api/organAPI'
import deletePermissionAPI from '@/app/api/deletePermissionAPI'
import Footer from '@/app/View/Components/Footer'

const COLUMNS = [
    {
        Header:'#'
    },
    {
        Header:'Username'
    },
    {
        Header:'First Name'
    },
    {
        Header:'Last Name'
    },
    {
        Header:'Email'
    },
    {
        Header:'Phone'
    },
    {
        Header:'Role'
    },
    {
        Header:'Is Avtive'
    }
]

const PERMISSIONCOLUMNS = [
    {
        Header:'#'
    },
    {
        Header:'Username'
    },
    {
        Header:'Organ'
    },
    {
        Header:'Permission'
    }
]

export default function Admin() {

    const [error,setError] = useState('')
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([])
    const [username,setUsername] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [role,setRole] = useState('')
    const [isActive,setIsActive] = useState('')
    const [visible,setVisible] = useState({})
    const [rowLoading , setRowLoading] = useState(true)
    const [ispermission,setISPermission] = useState(false)
    const [userPermission , setUserPermissions] = useState([])
    const [organs , setOrgans] = useState([])
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

            async function fetch(){
                try{
    
                    let result = await getUsersAllDetailAPI()
    
                    setUserData(JSON.parse(localStorage.getItem('userData')))
      
                    setUsers(result)
      
                    result = await getAllUserPermissionsAPI()
    
                    setUserPermissions(result)
    
                    result = await organAPI()
    
                    setOrgans(result.organs)
    
                    setLoading(false)
    
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

    },[])

    const deleteUSer = async (val) => {
        try{
            await deleteUserAPI(val.username)
            window.location.reload()
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

    const refactoreUser = async (val) => {
        try{
            await refactoreUserAPI(val.username)
            window.location.reload()
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

    const updateUser = async (val) => {
        try{
            const APIdata = {
                username : username,
                firstName : firstName,
                lastName : lastName,
                email : email,
                phone:phone,
                role:role
            }

            await updateUserAPI(APIdata)
            await window.location.reload()

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

    const clickRow = (key,val) => {
        try{
            setVisible((prevVisibleRows) => ({
                [!key] : false,
                [key]: !prevVisibleRows[key] || false
            }))
            setUsername(val.username)
            setFirstName(val.first_name)
            setLastname(val.last_name)
            setEmail(val.email)
            setPhone(val.phone)
            setRole(val.role)
            setIsActive(val.is_active)
            
            async function fetch(organ){
                try{
                    
                    await setRowLoading(false)
                }catch(err){throw err}
            }
            fetch(val.id)
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

    const clickUser = () => {
        setISPermission(false)
    }
    
    const clickPermission = () => {
        setISPermission(true)
    }
    
    const deletePermission = async (val) => {
        try{
            await deletePermissionAPI(val)
            window.location.reload()
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
            <div className='admin-page'>
                {
                    loading? 
                    (
                        <p>loading</p>
                    )
                    :
                    (
                        <div>
                            <Header userData={userData}></Header>
                            <div className='page-container'>
                                <Navigation></Navigation>
                                <div className='user-table-container'>
                                    <div className='choose'>
                                        <div>
                                            <a onClick={clickUser}>users</a>
                                        </div>
                                        <div>
                                            <a onClick={clickPermission}>permissions</a>
                                        </div>
                                    </div>
                                    {
                                        ispermission?
                                        (
                                            <table className='user-table'>
                                                <tr>
                                                    {
                                                        PERMISSIONCOLUMNS.map((column) => {
                                                            return(
                                                                <th>{column.Header}</th>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                {
                                                    userPermission.map((val,key) => {
                                                        return(
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{val.username}</td>
                                                                <td>{
                                                                    organs.map((organ,key) => {
                                                                        if(organ.id === val.organ){
                                                                            return organ.name
                                                                        }
                                                                    })
                                                                }</td>
                                                                <td>{val.permission}</td>
                                                                <td>
                                                                    <input type='button' value={'DELETE'} className='table-input-btn' onClick={() => deletePermission(val)}/>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            <a className='add-link' href='/pages/Admin/User/addUserPermission'>
                                                <label htmlFor='add'>
                                                    <MdAdd className='add-icon'/>
                                                </label>
                                                <p className='add-btn' id='add'>ADD NEW</p>
                                            </a>
                                            </table>
                                        ):
                                        (
                                            <table className='user-table'>
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
                                                users.map((val,key) => {
                                                    return(
                                                        <React.Fragment>
                                                            <tr key={key} onClick={() => clickRow(key,val)}>
                                                                <td>{key + 1}</td>
                                                                <td>{val.username}</td>
                                                                <td>{val.first_name}</td>
                                                                <td>{val.last_name}</td>
                                                                <td>{val.email}</td>
                                                                <td>{val.phone}</td>
                                                                <td>{val.role}</td>
                                                                <td>{val.is_active}</td>
                                                            </tr>
                                                            {
                                                                visible[key]?
                                                                (
                                                                    rowLoading?
                                                                    (
                                                                        <tr className='update-row'> 
                                                                            <td>loading...</td>
                                                                        </tr>
                                                                    ):
                                                                    (
                                                                        <tr key={key} className='update-row'>
                                                                            <td>...</td>
                                                                            <td>{val.username}</td>
                                                                            <td>
                                                                                <input type='text' value={firstName} className='table-input' onChange={(e) => setFirstName(e.target.value)} minLength={3} required/>
                                                                            </td>
                                                                            <td>
                                                                                <input type='text' value={lastName} className='table-input' onChange={(e) => setLastname(e.target.value)} minLength={3} required/>
                                                                            </td>
                                                                            <td>
                                                                                <input type='text' value={email} className='table-input' onChange={(e) => setEmail(e.target.value)} minLength={3} required/>
                                                                            </td>
                                                                            <td>
                                                                                <input type='text' value={phone} className='table-input' onChange={(e) => setPhone(e.target.value)} minLength={3} required/>
                                                                            </td>
                                                                            <td>
                                                                                <select name='role-select' className='table-input' onChange={(e) => setRole(e.target.value)} required>
                                                                                    <option selected>manager</option>
                                                                                    <option>user</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                            {
                                                                                (val.is_active === 1)?
                                                                                    (

                                                                                        <input type='button' value={'DELETE'} className='table-input-btn' onClick={() => deleteUSer(val)}/>
                                                                                    ):
                                                                                    (
                                                                                        <input type='button' value={'REFACTORE'} className='table-input-btn' onClick={() => refactoreUser(val)}/>
                                                                                    )
                                                                                }
                                                                            </td>
                                                                            <td id='update'>
                                                                                <input type='button' value={'UPDATE'} className='table-input-btn' onClick={() => updateUser(val)}/>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                ):
                                                                (<tr/>)
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            <a className='add-link' href='/pages/Admin/User/addUser'>
                                                <label htmlFor='add'>
                                                    <MdAdd className='add-icon'/>
                                                </label>
                                                <p className='add-btn' id='add'>ADD NEW</p>
                                            </a>
                                        </table>
                                        )
                                    }
                                </div>
                            </div>
                            <Footer></Footer>
                        </div>
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
                    <div id='hidwjdij'/>
                )
            }
        </React.Fragment>
    )
}