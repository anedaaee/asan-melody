'use client'
import React,{useEffect} from "react";

import style from '@/app/Style/Error.css'

export default function Error401(){

    useEffect(() => {
        const changeWindow = () => {
            localStorage.clear()
            window.location.href = '/pages/Login'
        };

        const timeoutId = setTimeout(changeWindow, 5000);

    } , [])

    return(
        <div className="error-page-container">
            <h1>Not authenticated</h1>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>PLEASE LOGIN</h2>
        </div>
    )
}