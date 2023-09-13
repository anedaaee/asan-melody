'use client'
import React from "react";

import style from '@/app/Style/footer.css'

export default function Footer(props) {

 
    return(
        <footer id="footer">
            <div class="footer-info">
                <h3>ASAN MUSIC <br/><br/> EASY ACCESS FOR LEARNING<span>.</span></h3>
                <p>
                    Zanjan,Iran<br/>
                    Ali Nedaaee<br/>
                    <strong>Phone:</strong> +98 938 836 9873<br/>
                    <strong>Email:</strong> anedaaee@gmail.com<br/>
                </p>
            </div>
            <div className="links">                                
                <h4>Useful Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About us</a></li>
                    <li><a href="/#music-group">music groupe</a></li>
                    <li><a href="/#academies">academies</a></li>
                    <li><a href="/#concert">concert</a></li>
                </ul>
            </div>
            <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8106.655138960856!2d48.40069375913706!3d36.68304221150246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff618821e354add%3A0xd31d530de5fca9eb!2sUniversity%20of%20Zanjan!5e0!3m2!1sen!2s!4v1694588466128!5m2!1sen!2s" width="600" height="450" style={{border:'none',borderRadius:'10px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </footer>
    )
}