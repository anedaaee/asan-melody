'use client'
import React , {useState , useEffect} from 'react'

import {  MdClose , MdCheck , MdHome} from 'react-icons/md'

import style from '@/app/Style/purchase.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'
import Footer from '@/app/View/Components/Footer'

import getPurchaseAPI from '@/app/api/getPurchaseAPI'
import admitAPI from '@/app/api/admitAPI'

import { IMG_KEY } from '../../../../../config'

const COLUMNS = [
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

export default function Purchase() {

    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [purchases,setPurchases] = useState([])
    const [image,setImage] = useState([])
    const [showImage,setShowImage] = useState(false)
    const [error,setError] = useState('')
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
        async function fetch(){
            try{
                setUserData(JSON.parse(localStorage.getItem('userData')))

                let result = await getPurchaseAPI()

                setPurchases(result)

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

    },[])

    const getImage = async (profile) =>{
        try{
            setImage(profile)
            setShowImage(true)
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

    const closeImage = async () =>{
        try{
            setImage('')
            setShowImage(false)
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

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

    const admit = async(val) => {
        try{
            await admitAPI({user:val.user,class:val.class})
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
                                                COLUMNS.map((val) => (
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
                                                            <img className='table-image' src={`${IMG_KEY}${val.receipt}`} onClick={ () => getImage(val.receipt)} alt={val.receipt} onError={(e) => handleImageError(e)}/>   
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
                            </div>
                            <Footer></Footer>
                        </div>
                    )
                }
                <p id='error'>{error}</p>
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