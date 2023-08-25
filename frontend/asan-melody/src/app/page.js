import React from 'react'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import Link from 'next/link'
import Head from 'next/head'
import Header from './View/Components/Header/Header'
import Hero from './View/Components/hero/Hero'
import MusicGroup from './View/Components/Home.musicGroup'
import Academies from './View/Components/Home.academies'
import MusicAssociations from './View/Components/Home.associations'
import style from './Style/Main/Home.MusicGroup.css'
import Concert from './View/Components/Home.comcert'
export default function Page() {

  return (
    <div className='Home'>
      <Head>
        <title>Asan Melody</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <div id='Home'>
        <Header></Header>
        <Hero></Hero>
      </div>
      <main>
        <MusicGroup></MusicGroup>
        <Academies></Academies>
        <MusicAssociations></MusicAssociations>
        <Concert></Concert>
      </main>
    </div>
  )
}
