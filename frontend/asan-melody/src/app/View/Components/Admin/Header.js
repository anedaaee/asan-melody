'use client'
import React from "react";


export default function Header(props) {
    return(
        <header className="admin-header">
            <h1>
                wellcome back {props.userData.first_name} {props.userData.last_name} to your panel
            </h1>
        </header>
    )
}