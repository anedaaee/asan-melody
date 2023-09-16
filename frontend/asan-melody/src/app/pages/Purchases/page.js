'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { MdDone ,  MdClose , MdHome} from "react-icons/md"

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getPurchaseByUserUSERAPI from "@/app/api/getPurchaseByUserUSERAPI"

export default function Reservation() {

    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [purchases,setPurchases] = useState([])
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

                    setAuthToken(localStorage.getItem('authToken'))


                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    
                    let purchases = await getPurchaseByUserUSERAPI(JSON.parse(localStorage.getItem('userData')).username)
                    
                    setPurchases(purchases)

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
                                <LoginHeader></LoginHeader>
                            )
                            :
                            (<Header></Header>)
                        }
                        <div className="reserved-container">
                            {
                                purchases.map((purchase,key) => {
                                    let date = new Date(purchase.date)
                                    date =  date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                    return(
                                        <div className="reserved-item">
                                            <div className="class-image">
                                            <img src={`${IMG_KEY}${purchase.class_info.image}`} alt={purchase.class_info.image} onError={(e) => handleImageError(e)}/>
                                            </div>                                        
                                            <div  className="reserve-item-2">
                                                <h1>Date:</h1>
                                                <h2>{date}</h2>
                                            </div>
                                            <div className="reserve-item-2">
                                                <h2>{purchase.class_info.name} class</h2>
                                                <h3>Teacher : {purchase.class_info.teacher}</h3>
                                                <h5>{purchase.organ_info.name}</h5>
                                            </div>
                                            <div className="reserve-item-2">
                                                <h3>About : {purchase.class_info.description}</h3>
                                                <p>price : {purchase.class_info.price}</p>    
                                            </div>
                                            <div className="reserve-item-2">
                                                {
                                                    purchase.admit === 1 ? 
                                                    (<MdDone className="admit-icon"/>):
                                                    (<MdClose className="admit-icon"/>)
                                                }   
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