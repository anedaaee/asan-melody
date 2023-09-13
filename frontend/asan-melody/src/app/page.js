'use client'

import React,{useState , useEffect} from 'react'
import Head from 'next/head'
import Header from './View/Components/Header/Header'
import LoginHeader from './View/Components/Header/LoginHeader'
import Hero from './View/Components/hero/Hero'
import MusicGroup from './View/Components/Home.musicGroup'
import Academies from './View/Components/Home.academies'
import MusicAssociations from './View/Components/Home.associations'
import Concert from './View/Components/Home.comcert'
import Footer from './View/Components/Footer'

import style from './Style/Main/Home.MusicGroup.css'

export default function Page() {

  const [authToken , setAuthToken] = useState(null)

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'))
  },[])

  return (

    <div className='Home'>
      <Head>
        <title>Asan Melody</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <div id='Home'>
        {
          (authToken) ?
          (
            <LoginHeader></LoginHeader>
          )
          :
          (<Header></Header>)

        }
        <Hero></Hero>
      </div>
      <main>
        <MusicGroup></MusicGroup>
        <Academies></Academies>
        <MusicAssociations></MusicAssociations>
        <Concert></Concert>
        <Footer></Footer>
      </main>
    </div>
  )
}
