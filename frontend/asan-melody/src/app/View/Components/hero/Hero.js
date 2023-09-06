import React , {useEffect , useState}from "react"
import Script from "next/script"
import Link from "next/link"
import style from '../../../Style/Main/Hero/Hero.css'
import 'bootstrap/dist/css/bootstrap.min.css'   

export default function Hero() {
    
    const [authToken,setAuthToken] = useState(null)
    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'))
      },[])
    

    return (
        <section id="hero" className="hero d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4">
                        <h2 data-aos="fade-up">The easiest way to succeed in music</h2>
                        <div className="blockquote-container">
                            <div className="blockquote-div">
                                <blockquote data-aos="fade-up" data-aos-delay="100">
                                    <p>Popular groups</p>
                                    <p>The best music schools</p>

                                </blockquote>
                            </div>
                            <div className="blockquote-div">
                                <blockquote data-aos="fade-up" data-aos-delay="100">
                                    <p>The best teachers</p>
                                    <p>The best courses with </p>    
                                </blockquote>
                            </div>
                        </div>
                        {
                            authToken ? 
                            (
                            <div/>  
                            ):
                            (
                            <div className="auth-containter">
                            
                                <a className="auth-login" href="pages/Login">
                                    <div className="Link" id="login">login</div>
                                </a>
                                <a className="auth-signup"  href="pages/Signup">
                                    <div className="Link" id="signup">signup</div>
                                </a>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
  }