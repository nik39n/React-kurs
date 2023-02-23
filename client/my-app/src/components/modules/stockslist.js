import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import StockTiker from "./stocktiker";

function StocksList(){
    const [dbdata, setDbdata] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        const fetchData = async () => {
            let data1 = await axios.get(`http://localhost/stocks`);

            setDbdata(data1.data.map((item)=>(`${item['name']}`)));
            setIsLoading(false);

        }
        fetchData();
    },[dbdata])
    return(
        <div>
            {isLoading ? <h1>Loading</h1>:
                dbdata.map(element => <div className="list_item">
                    <Link to={"/ticker-details-stock/"+element.trim()} key={element} className="list_item_link" > {element} </Link>
                    <div className="cart">
                        <div className="list_cart">cart</div>
                        <div className="list_favourite">favourite</div>
                    </div></div>)}
            <StockTiker></StockTiker>
        </div>

    )
}
export default StocksList;