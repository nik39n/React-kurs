import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../style/modules/crypto/apiticker.css';

// import StockSocket from "stocksocket";

function StockTiker(props){

    const [priceNow, setPriceNow] = useState();
    const [infoName, setInfoName] = useState({});


    useEffect(()=>{
        const fetchData = async () => {

             let apiStockTicker = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data`,{
                 headers: {
                     'X-RapidAPI-Key': 'a942a5b67cmshc18c7032bf748c5p10d81ajsn760c27013e41',
                     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                 }
             });
            setPriceNow(apiStockTicker.data.financialData.currentPrice.raw);



        }
        const fetchDataDb = async ()=>{
            let dbinfo = await axios.get(`http://localhost/stocks`);
            if (dbinfo != undefined){
                dbinfo.data.forEach((elem)=>{
                    if ((elem.name).toLowerCase() == (props.name).toLowerCase()){
                        setInfoName(elem);
                    }
                });
            }
        }
        fetchDataDb();
        // fetchData();
    },[])
    return (
        <div className="main-dashboard">
            {infoName.full_name ? infoName.full_name : <h1>load</h1> }
            <div className="block-name">
                <div className="ticker-head">
                    <img src={infoName.img ? infoName.img : <span>load</span> } alt="" className="ticker-icon"/>
                    <div className="ticker-name">{infoName.name}</div>
                </div>
                <div className="ticker-description">
                    <div className="description-main">
                        <a href="client/my-app/src/components/modules/crypto/apiticker" className="company-name__link"><div className="company-name">{infoName.full_name ? infoName.full_name : <span>load</span> } / USD</div></a>
                        <div className="dotwrap"></div>
                        <div className="market-name">NYSE</div>
                    </div>
                    <div className="sector-name">
                        Stock
                    </div>
                </div>
            </div>

            <div className="block-main">

                <div className="main-stat">
                    <div className="price">
                        <div className={"live-price "}>
                            {priceNow}
                        </div>
                        <div className="price-currency">USD</div>
                        <div className={"changed-price__24h "}>
                            {/*{this.state.items.p ? Math.floor(this.state.items.p * 100) / 100: 0}*/}
                        </div>
                        <div className={"changed-price__24h-percentage "}>
                            {/*({(this.state.items.P ? Math.floor(this.state.items.P * 100) / 100 :0)  +"%"})*/}
                        </div>
                    </div>
                    <div className="work-time">
                        <div className="marker_market"></div>
                        <div className="work-time-status">Market Opened</div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default StockTiker;