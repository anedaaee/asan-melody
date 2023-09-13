'use client'
import React , {useState , useEffect} from "react"
import Script from "next/script"
import {MdMenu , MdSettings , MdClass , MdFollowTheSigns , MdMoney , MdShop , MdAdminPanelSettings} from 'react-icons/md'
import {FaUser} from "react-icons/fa"

import getUserAPI from "@/app/api/getUser"
import getUserDistinctPermisionAPI from "@/app/api/getUserDistinctPermissionAPI"

import style from '../../../Style/Header/LoginHeader.css'
import { resolve } from "styled-jsx/css"


export default function LoginHeader() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isUserNavOpen, setIsUserNavOpen] = useState(false);
    const [navBackground, setNavBackground] = useState("transparent");
    const [userData,setUserdata] = useState({})
    const [loading,setLoading] = useState(true)
    const [permissionsObj , setPermissionObj] = useState({})
    

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    const toggleUserNav = () => {
        setIsUserNavOpen(!isUserNavOpen);
    };

    const closeUserNav = () => {
        setIsUserNavOpen(false);
    };

    const ulStyle = {
        left: isNavOpen ? '0%' : '-100%',
    };
    
    const userDIvStyle = {
        display: isUserNavOpen ? 'block' : 'none',
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
        setNavBackground('#1b2f45');
        } else {
        setNavBackground('transparent');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window,location.reload();
    }

    useEffect(() => {
        async function fetch(){

            await getUserAPI( async (result , err) => {
                if(err){
                    //handle server Err
                }else{

                    try{
                        localStorage.setItem('userData',JSON.stringify(result.data.body.data))
                        setUserdata(JSON.parse(localStorage.getItem('userData')))
                        
                        let permissions = await getUserDistinctPermisionAPI({username : JSON.parse(localStorage.getItem('userData')).username});
                        setPermissionObj(permissions)

                        setLoading(false)
                        
                    }catch(err){
                        console.log(err);
                    }

                }
            })
        }
        
        fetch()
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
            <header className="login-header">
            {
            loading? 
            (
            
                <nav className="login-header-nav" style={{ background: navBackground }}>
                    <label className='login-logo'>Loading</label>
                </nav>
            ):
            (
                <nav className="login-header-nav" style={{ background: navBackground }}>
                    <label htmlFor='user-check' className="user-checkBtn">
                        <i className="user-menu-icon"><FaUser color="#e9d4c1"></FaUser></i>
                    </label>
                    <input type="checkbox" id="user-check" onClick={toggleUserNav}/>
                    
                    <label htmlFor='login-check' className="login-checkBtn">
                        <i className="login-menu-icon"><MdMenu color="#e9d4c1"></MdMenu></i>
                    </label>
                    <input type="checkbox" id="login-check" onClick={toggleNav}/>

                    <label className='login-logo'>Asan Melody</label>

                    <ul className="links" style={ulStyle}>
                        <li><a href='/#Home' onClick={closeNav}>Home</a></li>
                        <li><a href='/#music-group' onClick={closeNav}>Music Group's</a></li>
                        <li><a href='/#academies' onClick={closeNav}>Academie's</a></li>
                        <li><a href='/#music-associations' onClick={closeNav}>Music Association's</a></li>
                        <li><a href='/#concert' onClick={closeNav}>concert</a></li>
                        <li><a href='/#about' onClick={closeNav}>About</a></li>
                        <li><a href="/#contact" onClick={closeNav}>Contact us</a></li>
                    </ul>
                    <div className="user-info" style={userDIvStyle}>
                        <div className="user-info-content">
                            <a className="user-info-a" href="">
                                <label className="user-info-label" htmlFor="user-info-p">
                                    <FaUser className="icon-header"/>
                                </label>
                                <p className="user-info-p" >{userData.first_name + ' ' + userData.last_name + ' '}</p>
                                <p className="user-info-p">{'>'}</p>
                            </a>
                        </div>
                        {
                            (userData.role === 'manager')? 
                            (
                            <div className="user-info-content">
                                <a className="user-info-a" href="/pages/Admin">
                                    <label className="user-info-label" htmlFor="user-info-p">
                                        <MdSettings className="icon-header"/>
                                    </label>
                                    <p className="user-info-p" >manager panel</p>
                                </a>
                            </div>
                            ):
                            (<div/>)
                        }
                        {
                            (permissionsObj.admin)? 
                            (
                            <div className="user-info-content">
                                <a className="user-info-a" href="/pages/AdminPanel">
                                    <label className="user-info-label" htmlFor="user-info-p">
                                        <MdAdminPanelSettings className="icon-header"/>
                                    </label>
                                    <p className="user-info-p" >admin panel</p>
                                </a>
                            </div>
                            ):
                            (<p>{JSON.stringify(permissionsObj)}</p>)
                        }
                        {
                            (permissionsObj.teacher)? 
                            (
                            <div className="user-info-content">
                                <a className="user-info-a" href="/pages/Teacher">
                                    <label className="user-info-label" htmlFor="user-info-p">
                                        <MdClass className="icon-header"/>
                                    </label>
                                    <p className="user-info-p" >teacher panel</p>
                                </a>
                            </div>
                            ):
                            (<div/>)
                        }
                        <div className="user-info-content">
                            <a className="user-info-a" href="/pages/MyClass">
                                <label className="user-info-label" htmlFor="user-info-p">
                                    <MdClass className="icon-header"/>
                                </label>
                                <p className="user-info-p" >my classes</p>
                            </a>
                        </div>
                        <div className="user-info-content">
                            <a  className="user-info-a" href="/pages/Favourites">
                                <label className="user-info-label" htmlFor="user-info-p">
                                    <MdFollowTheSigns className="icon-header"/>
                                </label>
                                <p className="user-info-p" >my favourite's</p>
                            </a>
                        </div>
                        <div className="user-info-content">
                            <a  className="user-info-a" href="/pages/Reservation">
                                <label className="user-info-label" htmlFor="user-info-p">
                                    <MdShop className="icon-header"/>
                                </label>
                                <p className="user-info-p" >my reservation</p>
                            </a>
                        </div>
                        <div className="user-info-content">
                            <a  className="user-info-a" href="/pages/Purchases">
                                <label className="user-info-label" htmlFor="user-info-p">
                                    <MdMoney className="icon-header"/>
                                </label>
                                <p className="user-info-p" >my purchases</p>
                            </a>
                        </div>
                        <a className="logout" onClick={handleLogout}>
                            <div className="logout-box">
                                logout
                            </div>
                        </a>
                    </div>

                </nav>
            
        )
        }</header>
    )
}