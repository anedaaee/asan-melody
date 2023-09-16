'use client'
import React , {useState , useEffect} from 'react'

import Image from 'next/image'

import style from '@/app/Style/homayoon.css'


import { MdClose , MdHome} from 'react-icons/md'


export default function Homayoon() {



    useEffect(() => {


    },[])

    return(
        <React.Fragment>
            <div className='containter'>   
                <img className='background' src='/homayoonBackground.jpg' alt='homayoon Background'/>
                <img className='profile' src='/homayoon.png' alt='homayoon profile'/>
                <div className='des'>
                    <h1>گروه موسیقی همایون</h1>
                    <h2>گروه موسیقی همایون در سال ۱۳۹۸ توسط سید مجتبی جلالی بنیان گذاری شد</h2>
                    <br/>
                    <h2>:از دست آور های این گروه میتوان به موارد زیر اشاره کرد</h2>
                    <ul>
                        <li>برگزاری کنسرت ها در شهر زنجان</li>
                        <li>ساخت اولین آلبوم موسیقی گروه با سبک های مختلف و شعر های شعرای ایران زمین و استفاده از ساز های کلاسیک و ایرانی</li>
                        <li>برگزاری اکثر اجرا های دانشگاه زنجان و تحصیلات تکمیلی علوم پایه زنجان</li>
                    </ul>
                </div>
            </div>
            <div className='member-container'>
                <div className='member'>
                    <img src='/homayoonMember/seyed.JPG' alt='seyed mojtaba jalali'/>
                    <h1>سید مجتبی جلالی چیمه</h1>
                    <h3>سرپرست - اهنگساز - نوازنده سنتور</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/aliNedaaee.jpg' alt='ali nedaaee'/>
                    <h1>سید علی ندایی اسکویی</h1>
                    <h3>اهنگساز - تنظیم کننده - نوازنده پیانو</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/shayan.JPG' alt='shayan bagherzadeh'/>
                    <h1>شایان باقر زاده</h1>
                    <h3>اهنگساز - نوازنده گیتار - خواننده</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/aliMiri.JPG' alt='seyed alireza miri'/>
                    <h1>سید علیرضا میری</h1>
                    <h3> نوازنده پرکاشن</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/aliGhorbani.jpg' alt='alireza ghorbani'/>
                    <h1>علیرضا قربانی</h1>
                    <h3>نوازنده گیتار بیس و الکتریگ</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/sepide.JPG' alt='sepide mahmood nia'/>
                    <h1>سپیده محمودنیا</h1>
                    <h3>نوازنده دف</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/omid.JPG' alt='omid noor mohammady'/>
                    <h1>امید نور محمدی</h1>
                    <h3>نوازنده دف</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/badi.JPG' alt='badie fahmi'/>
                    <h1>بدیع فهمی</h1>
                    <h3>نوازنده ویولن</h3>
                </div>
                <div className='member'>
                    <img src='/homayoonMember/yalda.JPG' alt='seyed'/>
                    <h1>یلدا اسماعیلی</h1>
                    <h3>نوازنده تنبک</h3>
                </div>
            </div>
        </React.Fragment>
    )
}