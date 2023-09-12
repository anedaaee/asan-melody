'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../config'

import { MdDone ,  MdClose} from "react-icons/md"

import style from '@/app/Style/reservation.css'

import Header from "@/app/View/Components/reserved/Header"
import LoginHeader from "@/app/View/Components/reserved/LoginHeader"

import getClassesTeacherAPI from "@/app/api/getClassesTeacherAPI"


export default function Teacher() {
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [error,setError] = useState('')
    const [classes,setClasses] = useState([])

    useEffect(() => {
        try{
            async function fetch() {
                try{

                    setAuthToken(localStorage.getItem('authToken'))
                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    
                    let classes = await getClassesTeacherAPI()
                    
                    setClasses(classes)

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

    const handleClick = async (class_) => {
        try{
            window.location.href = `/pages/Class?class_id=${class_.class_id}&all_data=${JSON.stringify(class_)}`
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
                                            <h5>Phone {class_.organ_info.phone}</h5>
                                        </div>
                                        <div className="reserve-item-2">
                                            <h1>students: </h1>
                                            <br/>
                                            {
                                                class_.student.map((std,key)=> {
                                                    return(
                                                        <React.Fragment>
                                                            <p>{std.first_name} {std.last_name}</p>
                                                            <br/>
                                                        </React.Fragment>
                                                    )
                                                })
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
    )
}