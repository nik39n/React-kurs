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
 const [priceFilter, setPriceFilter] = useState();
 const [nameFilter, setNameFilter] = useState();
 const [changeFilter, setChangeFilter] = useState();
 const [tradesFilter, setTradesFilter] = useState();
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
     const handelName = (e) => {
         if (nameFilter == undefined){
             setNameFilter(true);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);

             console.log("1",nameFilter);


         } else if(nameFilter == true){
             setNameFilter(false);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);

             console.log("2",nameFilter);


         } else if (nameFilter == false) {
             setNameFilter(true);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);

             console.log("3",nameFilter);


         }
     }
    const handelPrice = (e) => {
        if (priceFilter == undefined){
            setPriceFilter(true);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);

            console.log("1",priceFilter);

        } else if(priceFilter == true){
            setPriceFilter(false);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);

            console.log("2",priceFilter);

        } else {
            setPriceFilter(true);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);

            console.log("3",priceFilter);
        }
    }
    const handelChange = (e) => {
        if (changeFilter == undefined){
            setChangeFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);

            console.log(changeFilter);

        } else if(changeFilter == true){
            setChangeFilter(false);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);
            console.log(changeFilter);

        } else {
            setChangeFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);
            console.log(changeFilter);

        }
    }
    const handelTrades = (e) => {
        if (tradesFilter == undefined){
            setTradesFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);
            console.log(tradesFilter);

        } else if(tradesFilter == true){
            setTradesFilter(false);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);
            console.log(changeFilter);

        } else {
            setTradesFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);
            console.log(changeFilter);

        }
    }



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
                        <div onClick={handelName} className="filter_item filter_item_name">Name</div>
                        <div className="filter_wrapper">
                            <div onClick={handelPrice} className="filter_item filter_item_price">Price</div>
                            <div onClick={handelChange} className="filter_item filter_item_change">24h</div>
                            <div onClick={handelTrades} className="filter_item filter_item_trades">Trades</div>
                        </div>
                        <div className="plug">

                        </div>

                    </div>
                    {
                        params.typeActives == "crypto" ? <Cryptolist parentToChildInput={dataToList} parentToChildFilterName={nameFilter} parentToChildFilterPrice={priceFilter} parentToChildFilterChange={changeFilter} parentToChildFilterTrades={tradesFilter}  childToParent={childToParent}></Cryptolist> : <StocksList></StocksList>
                    }
                </div>
            </div>
        </div>

    )
}
export default MainPage;
