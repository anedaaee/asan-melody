'use client'
import React from "react";

import { MdDashboard , MdWork , MdWallet , MdGroup} from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Navigation() {
    return(
        <div className="nav-container">
            <div className="nav-item">
                <label htmlFor="nav-link">
                    <MdDashboard className="nav-link-icon"/>
                </label> 
                <a className="nav-link" href="/pages/Admin">dashboard</a>
            </div>
            <hr/>
            <br/>
            <br/>
            <div className="nav-item">
                <a href="/pages/Admin/User">
                    <label htmlFor="nav-link">
                        <FaUser className="nav-link-icon"/>
                    </label> 
                    <p className="nav-link">user management</p>
                </a>
            </div>
            <hr/>
            <br/>
            <div className="nav-item">
                <a href="/pages/Admin/organ">
                    <label htmlFor="nav-link">
                        <MdWork className="nav-link-icon"/>
                    </label> 
                    <p className="nav-link">organizations</p>
                </a>
            </div>
            <hr/>
            <br/>
            <div className="nav-item">
                <a href="/pages/Admin/classes">
                    <label htmlFor="nav-link">
                        <MdWallet className="nav-link-icon"/>
                    </label> 
                    <p className="nav-link">classes</p>
                </a>
            </div>
            <hr/>
            <br/>
            <div className="nav-item">
                <a href="#">
                    <label htmlFor="nav-link">
                        <MdGroup className="nav-link-icon"/>
                    </label> 
                    <p className="nav-link">purchases</p>
                </a>
            </div>
            <hr/>
            <div className="nav-item-p">
                <p className="nav-p">asan melody</p>
            </div>

        </div>
    )
}