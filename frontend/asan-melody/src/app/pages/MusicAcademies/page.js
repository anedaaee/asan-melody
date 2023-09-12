'use client'
import React , {useState , useEffect} from 'react'

import { FaPlus , FaMinus} from 'react-icons/fa'

import style from '@/app/Style/MusicAcademies.css'


import getAcademiesAPI from '@/app/api/getAcademyAPI'
import getFollowdOrganAPI from '@/app/api/getFollowedOrganAPI'
import followdAPI from '@/app/api/followAPI'
import unfollowdAPI from '@/app/api/unfollowAPI'

import Header from '@/app/View/Components/musicGroup/Header'
import LoginHeader from '@/app/View/Components/musicGroup/LoginHeader'

import { IMG_KEY } from '../../../../config'

export default function MusicAcademies(){

    const [authToken , setAuthToken] = useState(null)
    const [academy,setAcademies] = useState([])
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [followdOrgan,setFollowedOrga] = useState([])

    useEffect(() => {
        try{
            async function fetch() {
                try{
                    let result = await getAcademiesAPI()

                    await setAcademies(result)

                    await setAuthToken(localStorage.getItem('authToken'))


                    await setUserData(JSON.parse(localStorage.getItem('userData')))

                    
                    if(localStorage.getItem('authToken')){
                
                        result = await getFollowdOrganAPI(JSON.parse(localStorage.getItem('userData')).username)
                        
                        await setFollowedOrga(result)
                        
                    }
                    
                    await setLoading(false)

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
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

    const goToLogin = () => {
        try{
            window.location.href = '/pages/Login'
        }catch(err){    
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }   
    }

    const follow = async (organ) => {
        try{
            await followdAPI({organ:organ,username:userData.username})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const unfollow = async (organ) => {
        try{
            await unfollowdAPI({organ:organ,username:userData.username})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    }

    const renderButton = (organ) => {
        
        const renderedElements = [];
        if(followdOrgan){
            let flag = false
            followdOrgan.map((val,key) => {
                if (val.organ_id === organ){
                    flag = true
                }
            })
        
            if(!flag){
                renderedElements.push(
                    <button className='follow-btn'  onClick={() => follow(organ)}><FaPlus className='icon'/>follow</button>
                )
            }else{
                renderedElements.push(
                    <button className='follow-btn' onClick={() => unfollow(organ)}><FaMinus className='icon'/>unfollow</button>
                )
            }
        }

        return renderedElements;
    }

    const renderElement = () => {

        const renderedElements = [];

        for (let i = 0 ; i < academy.length ; i+=4){
            renderedElements.push(
                <div className='group-container' key={i}>
                    {
                        academy[i]?
                        (
                            <div className='group-div' id={i}>
                                    {
                                        (authToken)?
                                        (
                                            renderButton(academy[i].id)
                                        ):
                                        (<button className='follow-btn' onClick={() => goToLogin()}><FaPlus className='icon'/>follow</button>)
                                    }  
                                    
                                    <img className='background' src={`${IMG_KEY}${academy[i].background_image}`} alt={`${academy[i].name} background`} onError={(e) => handleImageError(e)}></img>    
                                    <div className='image-des-container'>
                                        <img src={`${IMG_KEY}${academy[i].profile_image}`} alt={`${academy[i].name} profile`} onError={(e) => handleImageError(e)}/>
                                        <div className='des'>
                                            <h1>{academy[i].name}</h1>
                                            <p>{academy[i].description}</p>
                                        </div>
                                    </div>
                            </div>
                        ):
                        (
                            <div/>
                        )
                    }
                    {
                        academy[i+1]?
                        (
                            <div className='group-div' id={i+1}>  
                                    {
                                        (authToken)?
                                        (
                                            renderButton(academy[i+1].id)
                                        ):
                                        (<button className='follow-btn'><FaPlus className='icon' onClick={goToLogin}/>follow</button>)
                                    }  
                                    <img className='background' src={`${IMG_KEY}${academy[i+1].background_image}`} alt={`${academy[i+1].name} background`} onError={(e) => handleImageError(e)}></img>    
                                    <div className='image-des-container'>
                                        <img src={`${IMG_KEY}${academy[i+1].profile_image}`} alt={`${academy[i+1].name} profile`} onError={(e) => handleImageError(e)}/>
                                        <div className='des'>
                                            <h1>{academy[i+1].name}</h1>
                                            <p>{academy[i+1].description}</p>
                                        </div>
                                    </div>
                            </div>
                        ):
                        (
                            <div/>
                        )
                    }
                    {
                        academy[i+2]?
                        (
                            <div className='group-div' id={i+2}>  
                                    {
                                        (authToken)?
                                        (
                                            renderButton(academy[i+2].id)
                                        ):
                                        (<button className='follow-btn'><FaPlus className='icon' onClick={goToLogin}/>follow</button>)
                                    }  
                                    <img className='background' src={`${IMG_KEY}${academy[i+2].background_image}`} alt={`${academy[i+2].name} background`} onError={(e) => handleImageError(e)}></img>    
                                    <div className='image-des-container'>
                                        <img src={`${IMG_KEY}${academy[i+2].profile_image}`} alt={`${academy[i+2].name} profile`} onError={(e) => handleImageError(e)}/>
                                        <div className='des'>
                                            <h1>{academy[i+2].name}</h1>
                                            <p>{academy[i+2].description}</p>
                                        </div>
                                    </div>
                            </div>
                        ):
                        (
                            <div/>
                        )
                    }
                    {
                        academy[i+3]?
                        (
                            <div className='group-div' id={i+3}>
                                    {
                                        (authToken)?
                                        (
                                            renderButton(academy[i+3].id)
                                        ):
                                        (<button className='follow-btn'><FaPlus className='icon' onClick={goToLogin}/>follow</button>)
                                    }    
                                    <img className='background' src={`${IMG_KEY}${academy[i+3].background_image}`} alt={`${academy[i+3].name} background`} onError={(e) => handleImageError(e)}></img>    
                                    <div className='image-des-container'>
                                        <img src={`${IMG_KEY}${academy[i+3].profile_image}`} alt={`${academy[i+3].name} profile`} onError={(e) => handleImageError(e)}/>
                                        <div className='des'>
                                            <h1>{academy[i+3].name}</h1>
                                            <p>{academy[i+3].description}</p>
                                        </div>
                                    </div>
                            </div>
                        ):
                        (
                            <div/>
                        )
                    }

                </div>
            )
        }
        return renderedElements
    }
    return (
        <div className='musicGroupePage'>
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
                        <section className='hero'>
                            <img className='hero-image' src='/music-group-page.jpg' alt='music-group-page'/>
                        </section>
                        <section className='group-section'>
                            {
                                renderElement()
                            }
                        </section>
                    </React.Fragment>
                )
            }
        </div>
    )
}