'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../../config'

import { FaUser } from "react-icons/fa"
import { MdCheck ,  MdClose , MdGridOn , MdSettings , MdAdd } from "react-icons/md"

import style from '@/app/Style/AdminPanel.css'

import getPostAdminAPI from "@/app/api/getPostAdminAPI"
import deletePostAdminAPI from "@/app/api/deletePostAdminAPI"
import refactorePostAdminAPI from "@/app/api/refactorePostAminAPI"

export default function showOrgan() {
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [error,setError] = useState('')
    const [posts , setPosts] = useState([])
    const [organ,setOrgan] = useState({})
    const [id,setId] = useState('')

    useEffect(() => {
        try{
            async function fetch() {
                try{
                    const queryString = window.location.search
                
                    const params = new URLSearchParams(queryString)
            
                    setId(params.get('id'))
                    setOrgan(JSON.parse(params.get('organ')))
                    
                    let posts = await getPostAdminAPI(params.get('id')) 
                    setPosts(posts)
                    setAuthToken(localStorage.getItem('authToken'))
                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    


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


    const deletePost = async (id) =>{
        try{
            await deletePostAdminAPI({id:id})
            window.location.reload()
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }
        }
    } 

    const refactorePost = async (id) =>{
        try{
            await refactorePostAdminAPI({id:id})
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
                    <header className="header-organ-item">
                        <img className='header-organ-background-image' src={`${IMG_KEY}${organ.background_image}`} alt={organ.name + 'background'} onError={(e) => handleImageError(e)}/>
                        <img className='header-organ-profile-image' src={`${IMG_KEY}${organ.profile_image}`}  alt={organ.name + 'profile'} onError={(e) => handleImageError(e)}/>
                        <div className="header-organ-info">
                            <h1>{organ.name}</h1>
                            <h2>{organ.description}</h2>
                            <h3>Owner: {organ.manager}</h3>
                            <br/>
                            <hr/>
                            <br/>
                            <h4>Phone : {organ.phone}</h4>
                            <h4>Address : {organ.address}</h4>
                        </div>
                    </header>

                    <section className="post-container">
                    {
                        posts.map((post,key) => {
                            let date =new Date(post.date)

                            return(
                                <div className="post-item">
                                    <img className='post-image' src={`${IMG_KEY}${post.file}`}  alt={post.title + 'image'} onError={(e) => handleImageError(e)}/>
                                    <div className="post-info">
                                        <h1>{post.title}</h1>
                                        <div className="post-description">
                                            <h4>{post.description}</h4>
                                        </div>
                                        <div className="button-container">
                                            {
                                                (post.isActive === 1)?
                                                (
                                                    <button className="post-button" onClick={() => deletePost(post.id)}>DELETE</button>
                                                ):
                                                (
                                                    <button className="post-button" onClick={() => refactorePost(post.id)}>REFACTORE</button>
                                                )
                                            }
                                        </div>
                                        <p>{date.getFullYear()}/{date.getMonth()}/{date.getDay()}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </section>
                </React.Fragment>
            )
        }
    </div>
    )
}