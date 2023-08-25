import React from "react"
import Script from "next/script"
import {MdMenu} from 'react-icons/md'
import style from '../../../Style/Header/Header.css'


export default function Header() {
  
    return (
      <header className="main-header">
        <nav className="header-nav">
            <label htmlFor='check' className="checkBtn">
                <i className="menu-icon"><MdMenu color="#e9d4c1"></MdMenu></i>
            </label>
            <input type="checkbox" id="check"/>
            <label className='logo'>Asan Melody</label>
            <ul>
            <li><a href='#Home'>Home</a></li>
            <li><a href='#music-group'>Music Group's</a></li>
            <li><a href='#academies'>Academie's</a></li>
            <li><a href='#music-associations'>Music Association's</a></li>
            <li><a href='#concert'>concert</a></li>
            <li><a href='#'>About</a></li>
            <li><a href="#">Contact us</a></li>
            </ul>
        </nav>
      </header>
    )
  }