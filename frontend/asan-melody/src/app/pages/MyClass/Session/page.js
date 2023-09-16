'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../../config'

import { MdDone ,  MdClose , MdHome , MdDelete} from "react-icons/md"

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getSessionsStudentAPI from "@/app/api/getSessionStudentAPI"

export default function Sessions() {

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

                    const queryString = window.location.search
                
                    const params = new URLSearchParams(queryString)
                    
                    setId(params.get('class_id'))
                    setClassData(JSON.parse(params.get('all_data')))
    
                    let sessions = await getSessionsStudentAPI(params.get('class_id'))
        
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
                                        </div>
                                    )
                                })
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