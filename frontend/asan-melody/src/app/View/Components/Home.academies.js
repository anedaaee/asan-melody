import React from "react";
import style from '../../Style/Main/Home.Academies.css'
import Aos from "aos";
const Academies = () => {
    return (
        <section id="academies" data-aos='fade-up'>
            <div className="academies-container">
                <div className="image">
                </div>
                <div className="text">
                    <h1>Academies</h1>
                    <br/>
                    <br/>
                    <blockquote>
                        <p>Teaching different styles of music</p>
                        <p>Teaching all kinds of Iranian and classical instruments</p>
                        <p>Teaching music theory</p>
                        <p>Learning music harmony</p>
                        <p>Group and private classes</p>
                    </blockquote>
                </div>
            </div>
        </section>
    )
} 
export default Academies;