import './style/maindashboard.css';
import  { ApiTicker } from './modules/apiticker';
import MainChart from "./modules/mainchart";
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





    