import React, {useEffect, useState} from "react";
import './style/mainpage.css';
import axios from "axios";
import mainchart from "./modules/mainchart";
import Header from "./modules/header";
import {Link, useParams} from "react-router-dom";
import Cryptolist from "./modules/cryptolist";
import Stockslist from "./modules/stockslist";
import {Line} from "react-chartjs-2";
import { useCookies } from 'react-cookie';
import CryptoList from "./modules/cryptolist";
import StocksList from "./modules/stockslist";

function MainPage () {
 const params = useParams();
 const [searchInput, setSearchInput] = useState("");
 const [childData , setChildData] = useState('');
 const [dataToList, setDataToList] = useState();
 const childToParent = (childData) => {
    setChildData(childData);
 }
 const handleChange = (e) => {
    setSearchInput(e.target.value);
     let arr = [];
     childData.forEach((element)=>{
         let ticker = Object.keys(element);
         let name = Object.values(element);
         if (ticker[0].toLowerCase().match((e.target.value).toLowerCase()) || name[0].toLowerCase().match((e.target.value).toLowerCase())){
             arr.push(element);
         }
     });
     // childData.filter((country) => {
     //     if(country.match(e.target.value)!= null){
     //         arr.push(country.match(e.target.value));
     //
     //     };
     // });
     setDataToList(arr);
 };



    return(
        <div className="main">
            <Header></Header>
            <div className="container">
                <div className="section_above_list">
                    <div className="name_of_market">
                        <h1>{params.typeActives.toUpperCase()}</h1>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search" onChange={handleChange} value={searchInput} className="search_input"/>
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
                        params.typeActives == "crypto" ? <Cryptolist parentToChild={dataToList} childToParent={childToParent}></Cryptolist> : <StocksList></StocksList>
                    }
                </div>
            </div>
        </div>

    )
}
export default MainPage;
