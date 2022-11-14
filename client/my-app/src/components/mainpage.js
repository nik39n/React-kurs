import React, {useEffect, useState} from "react";
import './style/mainpage.css';
import axios from "axios";
import mainchart from "./modules/mainchart";
import Header from "./modules/header";
import {Link, useParams} from "react-router-dom";
import Cryptolist from "./modules/cryptolist";
import Stockslist from "./modules/stockslist";
import {Line} from "react-chartjs-2";
import CryptoList from "./modules/cryptolist";
import StocksList from "./modules/stockslist";

function MainPage () {
 const params = useParams();
    return(
        <div className="main">
            <Header></Header>
            <div className="container">
                <div className="section_above_list">
                    <div className="name_of_market">
                        <h1>{params.typeActives.toUpperCase()}</h1>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
                <div className="list_of_actives">
                    <div className="filters">
                        <div className="filter_item">name</div>
                        <div className="filter_item">value</div>
                        <div className="filter_item">price</div>
                        <div className="filter_item">date</div>
                    </div>
                    {
                        params.typeActives == "crypto" ? <Cryptolist></Cryptolist> : <StocksList></StocksList>
                    }
                </div>
            </div>
        </div>

    )
}
export default MainPage;
