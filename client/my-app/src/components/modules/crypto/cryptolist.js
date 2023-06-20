import {Link, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';

import "../../style/modules/crypto/cryptolist.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CryptoList({childToParent,parentToChildInput,parentToChildFilterName,parentToChildFilterPrice,parentToChildFilterChange,parentToChildFilterTrades}){
    const [dbDataForSearch, setDbDataForSearch] = useState();
    const [titlesForStream, setTitlesForStream] = useState();
    const [dataFromStream, setDataFromStream] = useState();
    const [dbres, setDbRes] = useState();

    const [parentToChildFilterNameState, setParentToChildFilterNameState] = useState(parentToChildFilterName);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFiltration, setIsLoadingFiltration] = useState();

    const [cookies, setCookie] = useCookies([]);


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
        setDbDataForSearch(data1.data);
        setTitlesForStream(data1.data.map(elem=>elem.name.toLowerCase()));
        setDbRes(data1.data);
        childToParent(data1.data.map((elem)=>({[elem.name]: elem.full_name})));

    };


    useEffect(()=> {
        const fetchData = async () => {
            if(titlesForStream){
                let tickerarr = titlesForStream.map((elem)=> elem.toLowerCase()+"@ticker");
                let client = new W3CWebSocket(`wss://stream.binance.com:9443/ws/${tickerarr.join('/')}`);
                client.onopen = () => {
                }
                client.onmessage = (message) => {
                    let res = JSON.parse(message['data']);
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
                    setIsLoading(false);

                }
            }


        }

        if (parentToChildInput == undefined && parentToChildFilterName == undefined && parentToChildFilterPrice == undefined && parentToChildFilterChange == undefined && parentToChildFilterTrades == undefined){

            fetchData();

        }
        else if((parentToChildFilterName !== undefined  &&  parentToChildInput !== undefined) || (parentToChildFilterPrice !== undefined  &&  parentToChildInput !== undefined) || (parentToChildFilterChange !== undefined  &&  parentToChildInput !== undefined) || (parentToChildFilterTrades !== undefined  &&  parentToChildInput !== undefined)){

            if (parentToChildFilterName !== undefined  &&  parentToChildInput !== undefined){
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
            }
            if (parentToChildFilterPrice !== undefined  &&  parentToChildInput !== undefined){
                let arr = [];
                dbDataForSearch.forEach((element)=>{
                    parentToChildInput.forEach((elemParent)=>{
                        if (element.name == Object.keys(elemParent)){
                            arr.push(element);
                        }
                    });
                });
                if (parentToChildFilterPrice==true){
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('price'));
                } else {
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('price'));
                }
                setDbRes(arr);
            }
            if (parentToChildFilterChange !== undefined  &&  parentToChildInput !== undefined){
                let arr = [];
                dbDataForSearch.forEach((element)=>{
                    parentToChildInput.forEach((elemParent)=>{
                        if (element.name == Object.keys(elemParent)){
                            arr.push(element);
                        }
                    });
                });
                if (parentToChildFilterChange==true){
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('change'));
                } else {
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('change'));
                }
                setDbRes(arr);
            }
            if (parentToChildFilterTrades !== undefined  &&  parentToChildInput !== undefined){
                let arr = [];
                dbDataForSearch.forEach((element)=>{
                    parentToChildInput.forEach((elemParent)=>{
                        if (element.name == Object.keys(elemParent)){
                            arr.push(element);
                        }
                    });
                });
                if (parentToChildFilterTrades==true){
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                    arr.sort(propComparator('trades'));
                } else {
                    const propComparator = (propName) =>
                        (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                    arr.sort(propComparator('trades'));
                }
                setDbRes(arr);
            }

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
        <Row className='list_crypto_items'>
            {isLoading ? <h1 className="loading-header">Loading...</h1>:
                dbres.map(element => <Row className="list_item d-flex align-items-center" key={element.name} >
                    <Col xl={5} lg={3} md={4} sm={6} xs={7} >
                        <Link className='icon_title col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2' to={"/ticker-details/"+element.name.trim()}>
                            <img src={element.img} alt=""/>
                            <div key={element.full_name} className="ticker_name"> {element.full_name} </div>
                            <div key={element.name} className="list_item_link">{element.name}</div>
                        </Link>
                    </Col>
                    <Col xl={{span: 5}} lg={{span: 7}} md={6} sm={5} xs={4}>
                        <Link className='main_info col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8' to={"/ticker-details/"+element.name.trim()}>
                            <Row>
                                <Col xl={4} lg={4} md={4} sm={6} xs={6} className="ticker_stream" valueiconticker={element.name}>{element.price?`$${element.price}`:<p className="loading">Loading...</p>}</Col>
                                <Col xl={4} lg={4} md={4} sm={6} xs={6} className="ticker_stream_change" valueicontickerchange={element.name}>{element.change?`${element.change}%`:<p className="loading">Loading...</p>}</Col>
                                <Col xl={4} lg={4} md={4} className="ticker_stream_volume d-none d-md-block ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5" valueicontickertrades={element.name}>{element.trades?`${element.trades}`:<p className="loading">Loading...</p>}</Col>
                            </Row>
                        </Link>
                    </Col>

                    <Col xl={2} lg={2} md={2} sm={1} xs={1} className="cart">
                        <div onClick={handle} className="button_favourite_list" value={element.name}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px" value={element.name} valueicon={element.id} className="svg_icon_main">
                                <path value={element.name} valueicon={element.id} className={cookies.activeslist ? cookies.activeslist.includes(element.name) ? "svg_icon_black" : "svg_icon" :  "svg_icon"} id={"svg_icon"+element.id}  stroke="#111111" d="M17.56248,21.55957a1.00275,1.00275,0,0,1-.46531-.11475L12,18.76514,6.90283,21.44482a1.00019,1.00019,0,0,1-1.45117-1.0542l.97363-5.67578-4.12353-4.019a1.00033,1.00033,0,0,1,.5542-1.706l5.69873-.82813L11.103,2.99805a1.04173,1.04173,0,0,1,1.79394,0l2.54834,5.16357,5.69873.82813a1.00033,1.00033,0,0,1,.5542,1.706l-4.12353,4.019.97363,5.67578a1,1,0,0,1-.98586,1.169Z"/>
                            </svg>
                        </div>
                    </Col>
                </Row>)}
        </Row>

    )
}
export default CryptoList;