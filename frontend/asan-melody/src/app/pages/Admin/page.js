'use client'
import React , {useState , useEffect} from 'react'

import Image from 'next/image'

import style from '../../Style/admin.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'
import Dashboard from '@/app/View/Components/Admin/dashboard'

import dashboardAPI from '@/app/api/dashbourdData'

export default function Admin() {

    const [userData,setUserData] = useState({})
    const [dashboardData , setDashboardData] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function fetch(){
            try{
                await setUserData(JSON.parse(localStorage.getItem('userData')))
                let data = await dashboardAPI()
                
                console.log(data);
                setDashboardData (data)
                
                setLoading(false)
            }catch(err){
                console.log(err);
                //handle err
            }
        }

        fetch()

    },[])

    return(

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
                    </div>
                )
            }
        </div>
    )
}