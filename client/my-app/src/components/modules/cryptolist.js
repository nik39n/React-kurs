import {Link, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';

import "../style/modules/cryptolist.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function CryptoList({childToParent,parentToChildInput,parentToChildFilterName,parentToChildFilterPrice,parentToChildFilterChange,parentToChildFilterTrades}){
    const [dbDataForSearch, setDbDataForSearch] = useState();
    const [titlesForStream, setTitlesForStream] = useState();
    const [dataFromStream, setDataFromStream] = useState();
    const [dbres, setDbRes] = useState();

    const [parentToChildFilterNameState, setParentToChildFilterNameState] = useState(parentToChildFilterName);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFiltration, setIsLoadingFiltration] = useState();
    const [isLoadingFiltrationPrice, setIsLoadingFiltrationPrice] = useState();
    const [isLoadingFiltrationChange, setIsLoadingFiltrationChange] = useState();
    const [isLoadingFiltrationTrades, setIsLoadingFiltrationTrades] = useState();

    const [cookies, setCookie] = useCookies([]);
    const [tickerWaiter, setTickerWaiter] = useState(false);


    const handle = (event) => {
        if (cookies.activeslist === undefined){
            setCookie('activeslist', [event.target.getAttribute('value')], { path: '/' });
            const svg = document.getElementById(`svg_icon${event.target.getAttribute('valueicon')}`);
            svg.classList.add("svg_icon_black");

        } else {

            if (cookies.activeslist.includes(event.target.getAttribute('value'))){
                let index = cookies.activeslist.indexOf(event.target.getAttribute('value'));
                if (index !== -1) {
                    cookies.activeslist.splice(index, 1);
                }

                setCookie('activeslist', cookies.activeslist, { path: '/' });
                const svg = document.getElementById(`svg_icon${event.target.getAttribute('valueicon')}`);
                svg.classList.remove("svg_icon_black");
                svg.classList.add("svg_icon_white");


            } else {

                cookies.activeslist.push(event.target.getAttribute('value'))
                setCookie('activeslist', cookies.activeslist, { path: '/' });
                const svg = document.getElementById(`svg_icon${event.target.getAttribute('valueicon')}`);
                svg.classList.remove("svg_icon_white");
                svg.classList.add("svg_icon_black");
            }
        }
    };
    async function fetchdbinfo(){
        let data1 = await axios.get(`http://localhost/crypto`);
        console.log(data1);
        setDbDataForSearch(data1.data);
        setTitlesForStream(data1.data.map(elem=>elem.name.toLowerCase()));
        setDbRes(data1.data);
        childToParent(data1.data.map((elem)=>({[elem.name]: elem.full_name})));
        setIsLoading(false);

    };


    useEffect(()=> {
        const fetchData = async () => {
            // let stream_elem = document.getElementsByClassName("ticker_stream");
            // for (let item of stream_elem) {
            //     let ticker = item.getAttribute("valueiconticker")
            //     let data2 = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ticker}&interval=1d&startTime=${Date.now()-86457402}&limit=1`);
            //     item.innerHTML = data2.data[0][1];
            //     console.log(data2.data[0][1]);
            // }
            if(titlesForStream){
                let tickerarr = titlesForStream.map((elem)=> elem.toLowerCase()+"@ticker");
                let client = new W3CWebSocket(`wss://stream.binance.com:9443/ws/${tickerarr.join('/')}`);
                client.onopen = () => {
                    console.log(`Open`);
                }
                client.onmessage = (message) => {
                    let res = JSON.parse(message['data']);
                    let stream_elem = document.getElementsByClassName("ticker_stream");
                    let stream_elem_change = document.getElementsByClassName("ticker_stream_change");
                    let ticker_elem_volume = document.getElementsByClassName("ticker_stream_volume");

                    let arr = dbres;
                    arr.forEach((element)=>{
                        if (element.name == res.s){
                            if (res.c > 100){
                                element['price']=Math.trunc(res.c);
                            }
                            else if(res.c > 1 && res.c < 100){
                                element['price'] = Math.floor(res.c * 100)/100;
                            }
                            else {
                                element['price'] = Math.floor( res.c * 1000000) / 1000000;
                            }
                            element['trades'] = Math.trunc(res.n);
                            element['change'] = Math.floor( res.P * 100) / 100;
                        }
                    });
                    setDataFromStream(dbres[0].price);
                    // console.log(arr);
                    // for (let item of stream_elem) {
                    //     if (item.getAttribute("valueiconticker")==res.s){
                    //         if (res.c > 100){
                    //             item.innerHTML = `$${Math.trunc(res.c)}`;
                    //         }
                    //         else if(res.c > 1 && res.c < 100){
                    //             item.innerHTML = `$${Math.floor(res.c * 100)/100}`;
                    //         }
                    //         else{
                    //             item.innerHTML = `$${Math.floor( res.c * 1000000) / 1000000}`;
                    //         }
                    //
                    //     }
                    // }
                    // for (let item of stream_elem_change) {
                    //     if (item.getAttribute("valueicontickerchange")==res.s){
                    //         item.innerHTML = `${Math.floor( res.P * 100) / 100}%`;
                    //     }
                    // }
                    // for (let item of ticker_elem_volume) {
                    //     if (item.getAttribute("valueicontickerchange")==res.s){
                    //
                    //         item.innerHTML = Math.trunc(res.n);
                    //     }
                    // }
                    // console.log(res);
                }
            }


        }

        if (parentToChildInput == undefined && parentToChildFilterName == undefined && parentToChildFilterPrice == undefined && parentToChildFilterChange == undefined && parentToChildFilterTrades == undefined){

            fetchData();

        }
        else if(parentToChildFilterName !== undefined  && parentToChildInput !== undefined){
            let arr = [];
            dbDataForSearch.forEach((element)=>{
                parentToChildInput.forEach((elemParent)=>{
                    if (element.name == Object.keys(elemParent)){
                        arr.push(element);
                    }
                });
            });
            if (parentToChildFilterName==true){
                const propComparator = (propName) =>
                    (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                arr.sort(propComparator('full_name'));
            } else {
                const propComparator = (propName) =>
                    (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                arr.sort(propComparator('full_name'));
            }
            setDbRes(arr);
        } else if (parentToChildFilterName !== undefined || parentToChildFilterPrice !== undefined || parentToChildFilterChange !== undefined
            || parentToChildFilterTrades !== undefined){

            if (parentToChildFilterName !== undefined){
                if (parentToChildFilterName == true) {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('full_name'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);


                } else {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('full_name'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);


                };
            }
            if (parentToChildFilterPrice!==undefined){
                if (parentToChildFilterPrice==true) {
                    console.log(dbres);
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('price'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                }
                if (parentToChildFilterPrice==false) {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('price'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                };
            }
            if (parentToChildFilterChange!==undefined){
                if (parentToChildFilterChange==true) {
                    console.log(dbres);
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('change'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                }
                if (parentToChildFilterChange==false) {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('change'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                };
            }
            if (parentToChildFilterTrades!==undefined){
                if (parentToChildFilterTrades == true) {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('trades'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                }
                if (parentToChildFilterTrades==false) {
                    let arr = dbres;
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('trades'));
                    setDbRes(arr);
                    setIsLoadingFiltration(arr[0].trades);

                };
            }

        }
        else if (parentToChildInput !== undefined){
            console.log(parentToChildInput);
            let arr = [];
            dbDataForSearch.forEach((element)=>{
                parentToChildInput.forEach((elemParent)=>{
                    if (element.name == Object.keys(elemParent)){
                        arr.push(element);
                    }
                });
            });
            setDbRes(arr);
        }


    },[parentToChildInput,parentToChildFilterName,parentToChildFilterPrice,parentToChildFilterChange,parentToChildFilterTrades,isLoadingFiltration,titlesForStream]);

    useEffect(()=>{
        fetchdbinfo();
    },[]);

    return(
        <div className='list_crypto_items'>
            {isLoading ? <h1>Loading</h1>:
                dbres.map(element => <div className="list_item" key={element.name} >
                    <Link className='icon_title' to={"/ticker-details/"+element.name.trim()}>
                        <img src={element.img} alt=""/>
                        <div key={element.full_name} className="ticker_name"> {element.full_name} </div>
                        <div key={element.name} className="list_item_link">{element.name}</div>
                    </Link>
                    <Link className='main_info' to={"/ticker-details/"+element.name.trim()}>
                        <div className="ticker_stream" valueiconticker={element.name}>{element.price?`$${element.price}`:<p>Loading</p>}</div>
                        <div className="ticker_stream_change" valueicontickerchange={element.name}>{element.change?`${element.change}%`:<p>Loading</p>}</div>
                        <div className="ticker_stream_volume" valueicontickertrades={element.name}>{element.trades?`${element.trades}`:<p>Loading</p>}</div>
                    </Link>
                    <div className="cart">
                        <div onClick={handle} className="button_favourite_list" value={element.name}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px" value={element.name} valueicon={element.id} className="svg_icon_main">
                                <path value={element.name} valueicon={element.id} className={cookies.activeslist ? cookies.activeslist.includes(element.name) ? "svg_icon_black" : "svg_icon" :  "svg_icon"} id={"svg_icon"+element.id}  stroke="#111111" d="M17.56248,21.55957a1.00275,1.00275,0,0,1-.46531-.11475L12,18.76514,6.90283,21.44482a1.00019,1.00019,0,0,1-1.45117-1.0542l.97363-5.67578-4.12353-4.019a1.00033,1.00033,0,0,1,.5542-1.706l5.69873-.82813L11.103,2.99805a1.04173,1.04173,0,0,1,1.79394,0l2.54834,5.16357,5.69873.82813a1.00033,1.00033,0,0,1,.5542,1.706l-4.12353,4.019.97363,5.67578a1,1,0,0,1-.98586,1.169Z"/>
                            </svg>
                        </div>
                    </div>
                </div>)}
        </div>

    )
}
export default CryptoList;