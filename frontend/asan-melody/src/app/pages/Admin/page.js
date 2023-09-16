'use client'
import React , {useState , useEffect} from 'react'

import Image from 'next/image'

import style from '../../Style/admin.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'
import Dashboard from '@/app/View/Components/Admin/dashboard'
import Footer from '@/app/View/Components/Footer'

import { MdClose , MdHome} from 'react-icons/md'

import dashboardAPI from '@/app/api/dashbourdData'

export default function Admin() {

    const [userData,setUserData] = useState({})
    const [dashboardData , setDashboardData] = useState({})
    const [loading,setLoading] = useState(true)
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
                await setUserData(JSON.parse(localStorage.getItem('userData')))
                let data = await dashboardAPI()
                
                setDashboardData (data)
                
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
                                <Dashboard dashboardData={dashboardData}></Dashboard>
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
                    <div/>
                )
            }
        </React.Fragment>
    )
}