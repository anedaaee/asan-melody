'use client'
import React , {useState , useEffect} from "react"

import { IMG_KEY } from '../../../../../config'

import {MdClose , MdHome} from "react-icons/md"

import style from '@/app/Style/AdminPanel.css'

import getPostAdminAPI from "@/app/api/getPostAdminAPI"
import deletePostAdminAPI from "@/app/api/deletePostAdminAPI"
import refactorePostAdminAPI from "@/app/api/refactorePostAminAPI"
import addPostAdminAPI from "@/app/api/addPostAdminAPI"
import getUserDistinctPermisionAPI from "@/app/api/getUserDistinctPermissionAPI"

export default function showOrgan() {
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState({})
    const [authToken , setAuthToken] = useState(null)
    const [posts , setPosts] = useState([])
    const [organ,setOrgan] = useState({})
    const [id,setId] = useState('')
    const [isAddPost,setIsAddPost] = useState(false)
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [file,setFile] = useState('')
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
                    let permission = await getUserDistinctPermisionAPI(JSON.parse(localStorage.getItem('userData')).username)
                    if(!permission.teacher){
                        window.location.href = '/pages/Error/AccessDenied'
                    }
                    const queryString = window.location.search
                
                    const params = new URLSearchParams(queryString)
            
                    setId(params.get('id'))
                    setOrgan(JSON.parse(params.get('organ')))
                    
                    let posts = await getPostAdminAPI(params.get('id')) 
                    setPosts(posts)
                    setAuthToken(localStorage.getItem('authToken'))
                    setUserData(JSON.parse(localStorage.getItem('userData')))
                    


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


    const deletePost = async (id) =>{
        try{
            await deletePostAdminAPI({id:id})
            window.location.reload()
        }catch(err){
            handleErrorPages(err)
        }
    } 

    const refactorePost = async (id) =>{
        try{
            await refactorePostAdminAPI({id:id})
            window.location.reload()
        }catch(err){
            handleErrorPages(err)
        }
    } 

    const addNew = async () => {
        try{
            setIsAddPost(!isAddPost)
        }catch(err){
            handleErrorPages(err)
        }
    }

    const addNewPost = async () => {
        try{    
            await addPostAdminAPI({file:file,organ:id,title:title,description:description})
            window.location.reload()
        }catch(err){
            handleErrorPages(err)
        }
    }
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
                            <React.Fragment>
                            <div className="add-post">
                                <button className="add-post-button" onClick={addNew}>ADD NEW</button>
                            </div>
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
                            </React.Fragment>
                        </section>
                        <section className="add-post-section" style={isAddPost?{display:"flex"}:{display:"none"}}>
                            <MdClose onClick={addNew} className="close-icon-add-post"/>
                            <h1>ADD NEW POST</h1>
                            <form>
                                <input value={title} type="text" className="text-input" onChange={(e) => setTitle(e.target.value)} required/>
                                <textarea value={description} className="text-area-input" onChange={(e) => setDescription(e.target.value)} required/>
                                <label className="add-image-label" htmlFor="post-file">
                                    <div>
                                        ADD IMAGE FOR POST
                                    </div>
                                </label>
                                <input  type="file" className="file-input" id="post-file" onChange={(e) => setFile(e.target.files[0])} required/>
                                <button className="add-post-button-2" onClick={addNewPost}>ADD NEW</button>
                            </form>
                        </section>
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