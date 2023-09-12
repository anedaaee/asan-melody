'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getReservedByUserAPI from "@/app/api/getReservaedAPI"
import deleteReserveAPI from "@/app/api/deleteReserveAPI"
import purchaseAPI from "@/app/api/purchaseAPI"

export default function Reservation() {

    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [error,setError] = useState('')
    const [reserved,setReserved] = useState([])

    useEffect(() => {
        try{
            async function fetch() {
                try{

                    setAuthToken(localStorage.getItem('authToken'))


                    setUserData(JSON.parse(localStorage.getItem('userData')))

                    let reserved = await getReservedByUserAPI(JSON.parse(localStorage.getItem('userData')).username)

                    setReserved(reserved)

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

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; 
    };

    const purchase = async (file , data) => {
        try{    
            await purchaseAPI({receipt : file , user : data.user , class : data.class})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const cancelPurchase = async (data) => {
        try{
            await deleteReserveAPI({user : data.user  , class : data.class})
            window.location.reload()
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
                            reserved.map((reserve,key) => {
                                let date = new Date(reserve.Date)
                                date =  date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                return(
                                    <div className="reserved-item">
                                        <div className="class-image">
                                        <img src={`${IMG_KEY}${reserve.class_info.image}`} alt={reserve.class_info.image} onError={(e) => handleImageError(e)}/>
                                        </div>                                        
                                        <div  className="reserve-item-2">
                                            <h1>Date:</h1>
                                            <h2>{date}</h2>
                                        </div>
                                        <div className="reserve-item-2">
                                            <h2>{reserve.class_info.name} class</h2>
                                            <h3>Teacher : {reserve.class_info.teacher}</h3>
                                            <h5>{reserve.organ_info.name}</h5>
                                        </div>
                                        <div className="reserve-item-2">
                                            <h3>About : {reserve.class_info.description}</h3>
                                            <p>price : {reserve.class_info.price}</p>    
                                        </div>
                                        <div className="reserve-item-2-button">
                                            <label htmlFor="receipt">continiue purchase <br/> enter receipt</label>
                                            <input type="file" id="receipt" onChange={(e) => purchase(e.target.files[0] , reserve)} />
                                            <br/>
                                            <button onClick={() => cancelPurchase(reserve)}>cancel</button>    
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
    )
}