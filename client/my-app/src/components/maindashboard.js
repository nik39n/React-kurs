import './style/maindashboard.css';
import  { ApiTicker } from './modules/apiticker';
import {useParams} from 'react-router-dom';
import MainChart from "./modules/mainchart";
import React, {useEffect, useState} from 'react';
import Performance from "./modules/performance";
import axios from "axios";

function MainDashboard () {
    const params = useParams();
    return(
        <div className="main-content">
            <div className="chart">
                <MainChart name={params.tickerName}></MainChart>
            </div>

            <div className="ticker">
                <ApiTicker name={params.tickerName}></ApiTicker>
                <Performance name={params.tickerName}></Performance>
            </div>
        </div>
    );
}
export default MainDashboard;






    