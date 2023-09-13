'use client'
import React , {useState , useEffect} from "react"
import Script from "next/script"
import {MdMenu} from 'react-icons/md'
import style from '../../../Style/Header/Header.css'


export default function Header() {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navBackground, setNavBackground] = useState("transparent");

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const ulStyle = {
    left: isNavOpen ? '0%' : '-100%',
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavBackground('#1b2f45');
      setIsScrolled(true);
    } else {
      setNavBackground('transparent');
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="main-header">
      <nav className="header-nav" style={{ background: navBackground }}>
          <label htmlFor='check' className="checkBtn">
              <i className="menu-icon"><MdMenu color="#e9d4c1"></MdMenu></i>
          </label>
          <input type="checkbox" id="check" onClick={toggleNav}/>
          <label className='logo'>Asan Melody</label>
          <ul style={ulStyle}>
          <li><a href='/#Home' onClick={closeNav}>Home</a></li>
          <li><a href='/#music-group' onClick={closeNav}>Music Group's</a></li>
          <li><a href='/#academies' onClick={closeNav}>Academie's</a></li>
          <li><a href='/#music-associations' onClick={closeNav}>Music Association's</a></li>
          <li><a href='/#concert' onClick={closeNav}>concert</a></li>
          <li><a href='/#about' onClick={closeNav}>About</a></li>
          <li><a href="/#contact" onClick={closeNav}>Contact us</a></li>
          </ul>
      </nav>
    </header>
    )
  }