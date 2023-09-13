'use client'
import React , {useState , useEffect} from 'react'

import {  MdClose , MdCheck} from 'react-icons/md'

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

    const [error,setError] = useState('')
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [purchases,setPurchases] = useState([])
    const [image,setImage] = useState([])
    const [showImage,setShowImage] = useState(false)

    useEffect(() => {
        async function fetch(){
            try{
                await setUserData(JSON.parse(localStorage.getItem('userData')))

                let result = await getPurchaseAPI()

                await setPurchases(result)

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

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

    const admit = async(val) => {
        try{
            await admitAPI({user:val.user,class:val.class})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }
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
    )
}