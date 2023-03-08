import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import StockTiker from "./stocktiker";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useCookies} from "react-cookie";

function StocksList({searchInput,childToParent,parentToChildInput,parentToChildFilterName,parentToChildFilterPrice,parentToChildFilterChange,parentToChildFilterTrades}){


    const [dataFromDB, setDataFromDB] = useState([]);
    const [dataFromDBMain, setDataFromDBMain] = useState([]);

    const [dataFromAPI, setDataFromAPI] = useState();

    const [searchQuery, setSearchQuery] = useState(searchInput);

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

    useEffect(()=>{
            // Fetch data from database
            axios.get(`http://localhost/stocks`)
                .then(response => {setDataFromDB(response.data)
                    setDataFromDBMain(response.data)

                    const promises = [];
                    // for (let i = 0; i < response.data.length; i++) {
                    //     promises.push(axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${response.data[i].name}/1d`,{
                    //         headers: {
                    //             'X-RapidAPI-Key': '3cf983a538msh53edce89c4c83b6p1e2d74jsn4bdc62fb8b6c',
                    //             'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                    //         }
                    //     }));
                    // }

                    // Promise.all(promises)
                    //     .then(apiResponses => {
                    //         setDataFromAPI(apiResponses.map(response => [response.data.items[Object.keys(response.data.items)[Object.keys(response.data.items).length - 1]],response.data.items[Object.keys(response.data.items)[Object.keys(response.data.items).length - 2]]]));
                    //     }).catch(error => console.log(error));
                    }).catch(error => console.log(error));

    },[]);

    useEffect(()=>{
        let res = dataFromDBMain.filter(item => {
            return item.full_name.toLowerCase().includes(searchInput?.toLowerCase());
        });
        console.log(res);
        setDataFromDB(res);
    },[searchInput]);

    return(

        <Row className='list_stock_items'>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                {dataFromDB.map((element, index ) => <Row className="list_item d-flex align-items-center" key={element.name} >
                        <Col xl={5} lg={5} md={6} sm={6} xs={7} >
                            <Link className='icon_title col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2' to={"/ticker-details-stock/"+element.name.trim()} key={element.name}>
                                <img src={element.img} alt=""/>
                                <div key={element.full_name} className="ticker_name"> {element.full_name} </div>
                                <div key={element.name} className="list_item_link">{element.name}</div>
                            </Link>
                        </Col>
                        <Col xl={{span: 5}} lg={{span: 5}} md={4} sm={3} xs={2}>
                            <Link className='main_info col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8' to={"/ticker-details-stock/"}>
                                <Row>
                                    {/*<div>{apiData?apiData:'load'}</div>*/}
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream" valueiconticker={element.name}>{dataFromAPI ? dataFromAPI[index][0].close : <p className="loading">Loading...</p>}</Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream_change" valueicontickerchange={element.name}>{dataFromAPI ? ` ${Math.floor( (((dataFromAPI[index][0].close)-(dataFromAPI[index][1].close))*100/(dataFromAPI[index][1].close)) * 100) / 100}%`:<p className="loading">Loading...</p>}</Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream_volume d-none d-md-block ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5" valueicontickertrades={element.name}>{dataFromAPI ? dataFromAPI[index][0].volume : <p className="loading">Loading...</p>}</Col>
                                </Row>
                            </Link>
                        </Col>

                        <Col xl={2} lg={2} md={2} sm={1} xs={1} className="cart">
                            <div  className="button_favourite_list" value={element.name} onClick={handle}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px" value={element.name} valueicon={element.id} className="svg_icon_main">
                                    <path value={element.name} valueicon={element.id} className={cookies.activeslist ? cookies.activeslist.includes(element.name) ? "svg_icon_black" : "svg_icon" :  "svg_icon"} id={"svg_icon"+element.id}  stroke="#111111" d="M17.56248,21.55957a1.00275,1.00275,0,0,1-.46531-.11475L12,18.76514,6.90283,21.44482a1.00019,1.00019,0,0,1-1.45117-1.0542l.97363-5.67578-4.12353-4.019a1.00033,1.00033,0,0,1,.5542-1.706l5.69873-.82813L11.103,2.99805a1.04173,1.04173,0,0,1,1.79394,0l2.54834,5.16357,5.69873.82813a1.00033,1.00033,0,0,1,.5542,1.706l-4.12353,4.019.97363,5.67578a1,1,0,0,1-.98586,1.169Z"/>
                                </svg>
                            </div>
                        </Col>
                    </Row>)
                }
            </Col>
        </Row>
        // <div>
        //     {isLoading ? <h1>Loading</h1>:
        //         dbdata.map(element => <div className="list_item">
        //             <Link to={"/ticker-details-stock/"+element.trim()} key={element} className="list_item_link" > {element} </Link>
        //             <div className="cart">
        //                 <div className="list_cart">cart</div>
        //                 <div className="list_favourite">favourite</div>
        //             </div></div>)}
        // </div>

    )
}
export default StocksList;