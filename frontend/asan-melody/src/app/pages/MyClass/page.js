'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { MdClose ,MdHome} from "react-icons/md"

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getClassesStudentAPI from "@/app/api/getClassStudentAPI"


export default function Student() {
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [classes,setClasses] = useState([])
    const [error,setError] = useState('')
    const [errorHappened,setErrorHappend] = useState(false) 

    const handleErrorHappend = () => {
        setErrorHappend(!errorHappened)
    }
    
    const handleErrorPages = (err) => {
        if(!localStorage.getItem('authToken')){
            window.location.href = '/pages/Error/401'
        }
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
        try{
            async function fetch() {
                try{

                    setAuthToken(localStorage.getItem('authToken'))
                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    
                    let classes = await getClassesStudentAPI()
                    
                    setClasses(classes)

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

    const handleClick = async (class_) => {
        try{
            window.location.href = `/pages/MyClass/Session?class_id=${class_.class_id}&all_data=${JSON.stringify(class_)}`
        }catch(err){
            handleErrorPages(err)
        }
    }

    return(
        <React.Fragment>
            <div className='purchase-page'>
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
                                classes.map((class_,key) => {
                                    return(
                                        <div className="reserved-item" onClick={() => handleClick(class_)}>
                                            <div className="class-image">
                                            <img src={`${IMG_KEY}${class_.image}`} alt={class_.image} onError={(e) => handleImageError(e)}/>
                                            </div>                                        
                                            <div  className="reserve-item-2">
                                                <h1>{class_.name}</h1>
                                                <hr/>
                                                <br/>
                                                <h3>{class_.description}</h3>
                                            </div>
                                            <div className="reserve-item-2">
                                                <h1>Organ :</h1>
                                                <h2>{class_.organ_info.name}</h2>
                                                <br/>
                                                <h3>Address : {class_.organ_info.address}</h3>
                                                <br/>
                                                <h5>Phone +98 {class_.organ_info.phone}</h5>
                                            </div>
                                            <div className="reserve-item-2">
                                                <h1>teacher: </h1>
                                                <br/>
                                                <h2>{class_.teacher_info.first_name} {class_.teacher_info.last_name}</h2>  
                                                <br/>
                                                <hr/>
                                                <br/>
                                                <h5>Phone : +98 {class_.teacher_info.phone}</h5>
                                                <h5>Email : {class_.teacher_info.email}</h5>
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