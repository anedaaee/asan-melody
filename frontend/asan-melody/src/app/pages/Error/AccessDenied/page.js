'use client'
import React,{useEffect} from "react";

import style from '@/app/Style/Error.css'

export default function ErrorAD(){

    useEffect(() => {
        const changeWindow = () => {
            window.location.href = '/'
        };

        const timeoutId = setTimeout(changeWindow, 5000);

    } , [])

    return(
        <div className="error-page-container">
            <h1>ACCESS DENIED</h1>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>PLEASE BACK TO HOME</h2>
        </div>
    )
}