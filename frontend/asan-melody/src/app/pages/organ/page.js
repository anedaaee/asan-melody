'use client'
import React , {useState , useEffect} from "react"

import { MdGridOn , MdClass } from "react-icons/md"

import getOrganById from "@/app/api/getOrganByIdAPI"
import getUserPublicAPI from "@/app/api/getUserPublicAPI"
import getClassesByOrganAPI from "@/app/api/getClassesByOrganAPI"
import reserveAPI from "@/app/api/reserveAPI"
import getPostStudentAPI from "@/app/api/getPostsByOrganStudent"

import { IMG_KEY } from '../../../../config'

import style from '@/app/Style/showOrgan.css'

export default function Organ() {

    const [id,setId] = useState('')
    const [error,setError] = useState('') 
    const [organ,setOrgan] = useState({})
    const [loading,setLoading] = useState(true)
    const [manager,setManager] = useState({})
    const [classes,setClasses] = useState([])
    const [userData,setUserData] = useState({})
    const [posts,setPosts] = useState([])
    const [isPost,setIsPost] = useState(true)
    const [isClass,setIsClass] = useState(false)

    useEffect(() => {

        try{
            async function fetch(){

                const queryString = window.location.search
                
                const params = new URLSearchParams(queryString)
        
                setId(params.get('id'))
    
                let organById = await getOrganById(params.get('id'))
    
                setOrgan(organById)
                
                let manager = await getUserPublicAPI(organById.manager)

                setManager(manager)

                let classes = await getClassesByOrganAPI(params.get('id'))

                setClasses(classes)

                let posts = await getPostStudentAPI(params.get('id'))

                setPosts(posts)

                setUserData(JSON.parse(localStorage.getItem('userData')))

                setLoading(false)

            }
        
            fetch()
            
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }   
        }

    } ,[])
    

    const handleImageError = (event) => {
        event.target.src = '/alternative.png'; // Replace with the path to your alternative image
    };

    const handleClick = async (class_id) => {
        try{
            await reserveAPI({user:userData.username , class : class_id})
            window.location.href = '/pages/Reservation'
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }   
        }
    }

    const handleLocation = async (where) => {
        try{
            if(where === 1){
                setIsPost(true)
                setIsClass(false)
            }else if(where === 2){
                setIsPost(false)
                setIsClass(true)
            }
        }catch(err){
            setError('error happend please try again later!')
            if(err.response.status === 400){
                setError(err.response.data.metadata.messageEng)
            }   
        }
    }
    return(
        <div className="show-organ-page">
            {
                loading?
                (
                    <h1>loading...</h1>
                )
                :
                (
                    <div>
                        <div className="header-container">
                            <div className="organ-img-container">
                                <img className="organ-background" src={`${IMG_KEY}${organ.background_image}`} alt={organ.background_image} onError={(e) => handleImageError(e)}/>
                            </div>
                            <div className="organ-info-container">
                                <img className="organ-profile" src={`${IMG_KEY}${organ.profile_image}`} alt={organ.profile_image} onError={(e) => handleImageError(e)}/>
                                <div className="organ-info">
                                    <h1>{organ.name}</h1>
                                    <br/>
                                    <p>{organ.description}</p>
                                    <br/>
                                    <p>Addres : {organ.address}</p>
                                    <p>Phone : +98{organ.phone}</p>
                                </div>
                                <div className="manager-info">
                                    <h3>manager : {manager.first_name} {manager.last_name}</h3>
                                    <br/>
                                    <p>email : Email : {manager.email}</p>
                                    <p>phone : Phone : +98{manager.phone}</p>
                                </div>
                            </div>  
                        </div>
                        <div className="selector">
                            <div className="icon-container">
                                <MdGridOn className="icon" style={isPost ? {color:'#757070'} : {color:'#e9d4c1'}} onClick={() => handleLocation(1)}></MdGridOn>
                            </div>
                            <div className="icon-container">
                                <MdClass className="icon" style={isClass ? {color:'#757070'} : {color:'#e9d4c1'}} onClick={() => handleLocation(2)}></MdClass>
                            </div>
                        </div>
                        <div className="classes-container" style={isClass ? {display:'block'}:{display:'none'}}>
                            {
                                classes.map((val,key)=>{
                                    return (
                                        <div className="class-item">
                                            <img className="class-img" src={`${IMG_KEY}${val.image}`} alt={organ.image} onError={(e) => handleImageError(e)}/>
                                            <div className="class-info">
                                                <h1>{val.name}</h1>
                                                <h3>{val.description}</h3>
                                                <br/>
                                                <p>Teacher : {val.teacher}</p>
                                                <p>Address : {val.address}</p>
                                                <p>Stock : {val.number}</p>
                                                <br/>
                                                <p>Price : {val.price} IRR</p>
                                                <button className="buy-button" onClick={() => handleClick(val.class_id)}>buy</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="post-container" style={isPost ? {display:'block'}:{display:'none'}}>
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
                                            <p>{date.getFullYear()}/{date.getMonth()}/{date.getDay()}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
        </div>  
    )
}