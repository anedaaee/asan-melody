'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { MdDone ,  MdClose , MdDelete , MdHome} from "react-icons/md"

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getSessionsAPI from "@/app/api/getSessionsAPI"
import deleteSessionAPI from "@/app/api/deleteSessionAPI"
import addSessionAPI from "@/app/api/addSessionAPI"
import getUserDistinctPermisionAPI from "@/app/api/getUserDistinctPermissionAPI"

export default function Classes() {
    const [id,setId] = useState('')
    const [sessions,setSessions] = useState([])
    const [classData , setClassData] = useState({})
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [clicked, setClicked] = useState(false);
    const [description,setDiscription] = useState('')
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
            async function fetch() {
                try{
                    let permission = await getUserDistinctPermisionAPI(JSON.parse(localStorage.getItem('userData')).username)
                    if(!permission.teacher){
                        window.location.href = '/pages/Error/AccessDenied'
                    }
                    const queryString = window.location.search
                
                    const params = new URLSearchParams(queryString)
                    
                    setId(params.get('class_id'))
                    setClassData(JSON.parse(params.get('all_data')))
    
                    let sessions = await getSessionsAPI(params.get('class_id'))
        
                    setSessions(sessions)
                    
                    setUserData(JSON.parse(localStorage.getItem('userData')))
    
                    setLoading(false)

                    setAuthToken(localStorage.getItem('authToken'))

                    setLoading(false)

                }catch(err){
                    handleErrorPages(err)
                }
            }

            fetch()
        }catch(err){
            handleErrorPages(err)
        }
    } , [])

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; 
    };

    const deleteSession = async (session) => {
        try{
            await deleteSessionAPI({class : session.class , date : session.date})
            window.location.reload()
        }catch(err){
            handleErrorPages(err)
        }
    }

    const handleAddNew = async () =>{
        try{
            setClicked((clicked) => !clicked);    
        }catch(err){
            handleErrorPages(err)
        }
    }
    const handleClose = async () =>{
        try{
            setClicked((clicked) => !clicked);    
        }catch(err){
            handleErrorPages(err)
        }
    }

    const handleAddNewAPI = async () => {
        try{
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0'); 
            const formattedDate = `${year}-${month}-${day}`;
            await addSessionAPI({class:id , date:formattedDate,description:description})
            window.location.reload()
        }catch(err){
            handleErrorPages(err)
        }
    }

    return(
        <React.Fragment>
            <div className={`purchase-page`}>
            {
                loading?
                (
                    <h1>loading...</h1>
                ):
                (
                    <React.Fragment>
                        {
                            (authToken) ?
                            (
                                <LoginHeader color={'#000'}></LoginHeader>
                            )
                            :
                            (<Header color={'#000'}></Header>)
                        }
                        <div className="reserved-container">
                            {
                                sessions.map((session,key) => {
                                    const date = new Date(session.date)
                                    return(
                                        <div className="reserved-item">
                                            <div className="class-image">
                                            <img src={`${IMG_KEY}${classData.image}`} alt={classData.image} onError={(e) => handleImageError(e)}/>
                                            </div>                                        
                                            <div  className="reserve-item-2">
                                                <h1>{classData.name}</h1>
                                                <hr/>
                                                <br/>
                                                <h3>{classData.description}</h3>
                                            </div>
                                            <div className="reserve-item-2">
                                                <h3>Date : {date.getFullYear()}/{date.getMonth()}/{date.getDay()}</h3>
                                                <hr/>
                                                <br/>
                                                <h3>{session.description}</h3>
                                            </div>
                                            <div className="reserve-item-icon">
                                                <MdDelete id="delete-icon" onClick={() => deleteSession(session)}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className="add-session" onClick={handleAddNew}>ADD NEW</button>
                        <div className="add-session-container" style={clicked? { display: 'flex'} : {display: 'none'}}>
                            <MdClose className="close-icon" onClick={handleClose}/>
                            <h3>Your description</h3>
                            <textarea  onChange={(e) => setDiscription(e.target.value)} rows="20" cols="50"/>
                            <button className="add-session-2" onClick={handleAddNewAPI}>ADD</button>
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