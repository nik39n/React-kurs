import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MainChart from "./modules/mainchart";
import Performance from "./modules/performance";
import  { ApiTicker } from './modules/apiticker';
import Header from "./modules/header";
import './style/maindashboard.css';

import axios from "axios";

function MainDashboard () {
    const params = useParams();
    return(
        <div>
            <Header></Header>
            <div className='container'>
                <div className="main-content">
                    <div className="chart">
                        <MainChart name={params.tickerName}></MainChart>
                    </div>

                    <div className="ticker">
                        <ApiTicker name={params.tickerName}></ApiTicker>
                        <Performance name={params.tickerName}></Performance>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainDashboard;






    