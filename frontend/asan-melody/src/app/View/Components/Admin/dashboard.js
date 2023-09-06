'use client'
import React from "react";

import { FaUser  } from "react-icons/fa";
import { MdGroup , MdFactory , MdMoney } from "react-icons/md";


export default function Dashboard(props) {
    return(
        <section className="dashboard-container">
            <div className="dashboard-item">
                <label htmlFor="dashboard-text" className="dashboard-label1">
                    <FaUser className="dashboard-icon" color="#FFF"/>
                </label>
                <p className="dashboard-text">Number Of User:<br/> <h2>{props.dashboardData.numberOfUser} N/A</h2></p>
            </div>
            <div className="dashboard-item">
                <label htmlFor="dashboard-icon" className="dashboard-label2">
                    <MdGroup className="dashboard-icon" color="#FFF"/>
                </label>
                <p className="dashboard-text">Number Of Classes:<br/> <h2>{props.dashboardData.numberOfClass} N/A</h2></p>
            </div>
            <div className="dashboard-item">
                <label htmlFor="dashboard-icon" className="dashboard-label3">
                    <MdFactory className="dashboard-icon" color="#FFF"/>
                </label>
                <p className="dashboard-text">Number Of Organizations:<br/> <h2>{props.dashboardData.numberOfOrgan} N/A</h2></p>
            </div>
            <div className="dashboard-item">
                <label htmlFor="dashboard-icon" className="dashboard-label4">
                    <MdMoney className="dashboard-icon" color="#FFF"/>
                </label>
                <p className="dashboard-text">Total Amount:<br/> <h2>{props.dashboardData.totalAmount}</h2></p>
            </div>
        </section>
    )
}