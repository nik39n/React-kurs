import './maindashboard.css';
import  { ApiTicker } from './apiticker';
import MainChart from "./mainchart";
import React from 'react';

export class MainDashboard extends React.Component{
    state = {
        msg: "",
    }

    handleCallback = (childData) =>{
        this.setState({msg: childData})
    }
    render() {
        const {msg} = this.state;
        return(
            <div className="main-chart">
                <ApiTicker parentCallback = {this.handleCallback}></ApiTicker>
                <MainChart price={msg}></MainChart>
                <h1> {msg[msg.length - 1]}</h1>
            </div>
        );
    }
}





    