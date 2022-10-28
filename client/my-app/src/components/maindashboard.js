import './style/maindashboard.css';
import  { ApiTicker } from './modules/apiticker';
import MainChart from "./modules/mainchart";
import React from 'react';
import Performance from "./modules/performance";

export class MainDashboard extends React.Component{

    render() {
        return(
            <div className="main-content">
                <div className="chart">
                    <MainChart></MainChart>
                </div>

                <div className="ticker">
                    <ApiTicker parentCallback = {this.handleCallback}></ApiTicker>
                    <Performance></Performance>
                </div>

            </div>
        );
    }
}





    