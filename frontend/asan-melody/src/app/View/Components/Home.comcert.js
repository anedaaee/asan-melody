import React from "react";
import style from '../../Style/Main/Home.concert.css'
import Aos from "aos";
const Concert = () => {
    return (
        <section id="concert" data-aos='fade-up'>
            <div className="concert-container">
                <div className="image">
                </div>
                <div className="text">
                    <h1>Concert</h1>
                    <br/>
                    <br/>
                    <blockquote>
                        <p>Notification of concerts</p>
                        <p>ticket sales</p>
                    </blockquote>
                </div>
            </div>
        </section>
    )
} 
export default Concert;