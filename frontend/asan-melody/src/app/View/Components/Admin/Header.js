'use client'
import React, {useState , useEffect}  from "react";

import {MdMenu , MdSettings , MdClass , MdFollowTheSigns , MdMoney , MdShop , MdAdminPanelSettings , MdHome} from 'react-icons/md'
import {FaUser} from "react-icons/fa"

import getUserAPI from "@/app/api/getUser"
import getUserDistinctPermisionAPI from "@/app/api/getUserDistinctPermissionAPI"


export default function Header(props) {

        const [isNavOpen, setIsNavOpen] = useState(false);
        const [isUserNavOpen, setIsUserNavOpen] = useState(false);
        const [navBackground, setNavBackground] = useState("transparent");
        const [userData,setUserdata] = useState({})
        const [loading,setLoading] = useState(true)
        const [permissionsObj , setPermissionObj] = useState({})

        const ulStyle = {
            left: isNavOpen ? '0%' : '-100%',
        };
        
        const userDIvStyle = {
            display: isUserNavOpen ? 'block' : 'none',
        };

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
        const handleLogout = () => {
            localStorage.clear();
            window,location.href = '/';
        }
        const backToHome = () => {
            window,location.href = '/';
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
        
        
        return () => {

        };
    }, []);

    return(
        <div>
            {
                loading?
                (
                    <header className="admin-header">
                        <h1>loading...</h1>
                    </header>
                ):
                (
                    <React.Fragment>
                    <header className="admin-header">
                        <label htmlFor='user-check' className="user-checkBtn">
                            <i className="user-menu-icon"><FaUser className="icon-header"></FaUser></i>
                        </label>
                        <input type="checkbox" id="user-check" onClick={toggleUserNav}/>
                        <label className="user-checkBtn">
                            <i className="user-menu-icon"><MdHome className="icon-header" onClick={backToHome}></MdHome></i>
                        </label>
                        <h1>
                                wellcome back {props.userData.first_name} {props.userData.last_name} to your panel
                        </h1>
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
                    </header>
                    </React.Fragment>
                )
            }
        </div>
    )
}