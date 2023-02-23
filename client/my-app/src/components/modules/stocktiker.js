import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
// import StockSocket from "stocksocket";

function StockTiker(){

    const [priceNow, setPriceNow] = useState();

    useEffect(()=>{
        const fetchData = async () => {

             // let apiStockTicker = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data`,{
             //     headers: {
             //         'X-RapidAPI-Key': '30c2da4a55msh871baf4c2d8a78dp16021cjsn9e4fdc286002',
             //         'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
             //     }
             // });
            // setPriceNow(apiStockTicker.data.financialData.currentPrice.raw);



        }
        fetchData();
    },[])
    return(
        <div>
            {priceNow}
        </div>

    )
}
export default StockTiker;