import {Link, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';

import "../style/modules/cryptolist.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function CryptoList({childToParent,parentToChild}){
    const [dbdata, setDbdata] = useState();
    const [dbres, setDbRes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies([]);
    const [tickerArr, setTickerArr] = useState([]);
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
    useEffect(()=>{
        const fetchData = async () => {
            let data1 = await axios.get(`http://localhost/crypto`);
            setDbdata(data1.data);
            setDbRes(data1.data);
            // let LocalArr = [];
            // data1.data.map((element) => {
            //     let client = new W3CWebSocket(`wss://stream.binance.com:9443/ws/${element.name.toLowerCase()}@ticker`);
            //         client.onopen = () =>{
            //             LocalArr[element.id] = `${element.name} Open`;
            //             console.log(`${element.name} Open`)
            //         }
            //         client.onmessage = (message) =>{
            //             let res = JSON.parse(message['data']);
            //             LocalArr[element.id] = `${res.c}`;
            //             setTickerArr(tickerArr);
            //
            //             // // setTickerArr.push();
            //             // // console.log(res.c);
            //             // tickerArr.push(res.c);
            //         }}
            // );
            // console.log(LocalArr);
            childToParent(data1.data.map((elem)=>({[elem.name]: elem.full_name })));
            setIsLoading(false);
        }
        // const fetchLiveStrim = (elem) => {
        //     let client = new W3CWebSocket(`wss://stream.binance.com:9443/ws/${elem.toLowerCase()}@ticker`);
        //     client.onmessage = (message) =>{
        //         let res = JSON.parse(message['data']);
        //         console.log(res.c);
        //         tickerArr.push(res.c);
        //         setTickerArr(tickerArr);
        //     }
        // }
        if (parentToChild==null){
            fetchData();
        }
        else {
            let arr = [];
            dbdata.forEach((element)=>{
                parentToChild.forEach((elemParent)=>{
                    if (element.name == Object.keys(elemParent)){
                        arr.push(element);
                    }
                });
            });
            setDbRes(arr);
        }
    },[parentToChild])

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
                     {/*<p>{tickerArr[dbdata.indexOf(element)]}</p>*/}
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