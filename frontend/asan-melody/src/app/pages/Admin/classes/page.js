'use client'
import React , {useState , useEffect} from 'react'

import { FaUserPlus } from 'react-icons/fa'
import { MdAdd , MdClose , MdPermMedia} from 'react-icons/md'

import style from '@/app/Style/classes.css'

import Header from '@/app/View/Components/Admin/Header'
import Navigation from '@/app/View/Components/Admin/Navigation'



import { IMG_KEY } from '../../../../../config'

const COLUMNS = [
    {
        Header:'#'
    },
    {
        Header:'Name'
    },
    {
        Header:'Description'
    },
    {
        Header:'Teacher'
    },
    {
        Header:'Price'
    },
    {
        Header:'Number'
    },
    {
        Header:'Organ'
    },
    {
        Header:'Image'
    },
    {
        Header:'Address'
    },
    {
        Header:'Is Active'
    }
]

export default function Organ() {

    const [error,setError] = useState('')
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        async function fetch(){
            try{
                await setUserData(JSON.parse(localStorage.getItem('userData')))
                
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

    const clickRow = (key,val) => {
        try{
            setVisible((prevVisibleRows) => ({
                [!key] : false,
                [key]: !prevVisibleRows[key] || false
            }))

            
            async function fetch(){
                try{

                }catch(err){throw err}
            }
            fetch()
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
                        <Header userData={userData}></Header>
                        <div className='page-container'>
                            <Navigation></Navigation>
                            <div className='organ-table-container'>                                
                                <table className='organ-table'>
                                    <tr>
                                        {
                                            COLUMNS.map((val) => {
                                                return(
                                                    <th>{val.Header}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            <p id='error'>{error}</p>
        </div>
    )
}