'use client'
import React , {useState , useEffect} from 'react'

import Image from 'next/image'

import style from '@/app/Style/homayoon.css'


import { MdClose , MdHome} from 'react-icons/md'


export default function Admin() {



    useEffect(() => {


    },[])

    return(
        <React.Fragment>
        <div className='containter'>   
            <img className='background' src='/developer.jpg' alt='asan melody Background'/>
            <img className='profile' src='/asanMelody.png' alt='asan melody profile'/>
            <div className='des'>
                <h1>آسان ملودی</h1>
                <h2>نرم افزار اتوماسیون مدیریت جامع ارگان های موسیقی</h2>
                <br/>
                <h2>این نرم افزار در تابستان ۱۴۰۲ توسط تیم توسعه دهنده آسان ملودی توسعه داده شد.</h2>
                <br/>
                <h2>کاربرد های نرم افزار</h2>
                <ul>
                    <li>امکان پوشش دادن تمامی کانون ها انجمن ها گروه ها و آموزشگاه های موسیقی کشور</li>
                    <li>ایجاد کلاس و مدیریت ثبت نام کلاس ها</li>
                    <li>انتشار اخبار ارگان ها</li>
                    <li>برگزاری و مدیریت کنسرت ها اجرا ها و بلیط فروشی</li>
                </ul>
            </div>
        </div>
        <div className='member-container'>
            <div className='member'>
                <img src='/asanMelodyMember/aliNedaaee.jpg' alt='ali nedaaee'/>
                <h1>سید علی ندایی اسکویی</h1>
                <h4>Front End and Back End <br/> And database And <br/> DevUps Developer</h4>
            </div>
        </div>
    </React.Fragment>
    )
}