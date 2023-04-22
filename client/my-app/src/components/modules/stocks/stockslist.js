import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useCookies} from "react-cookie";

function StocksList({searchInput,parentToChildFilterName,parentToChildFilterPrice,parentToChildFilterChange,parentToChildFilterTrades}){


    const [dataFromDB, setDataFromDB] = useState([]);
    const [dataFromDBMain, setDataFromDBMain] = useState([]);


    const [dataFromAPI, setDataFromAPI] = useState(
        [
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 153.7,
                    "high": 153.1,
                    "low": 152.3,
                    "close": 152.44,
                    "volume": 6431577,
                    "adjclose": 152.44
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 153.7,
                    "high": 154.03,
                    "low": 151.13,
                    "close": 151.6,
                    "volume": 56127900,
                    "adjclose": 151.6
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287202,
                    "open": 60.04,
                    "high": 60.13,
                    "low": 59.96,
                    "close": 60.11,
                    "volume": 761638,
                    "adjclose": 60.11
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 60.49,
                    "high": 60.57,
                    "low": 59.75,
                    "close": 60.01,
                    "volume": 13960000,
                    "adjclose": 60.01
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287223,
                    "open": 191.38,
                    "high": 186.5,
                    "low": 181.29,
                    "close": 181.49,
                    "volume": 25950741,
                    "adjclose": 181.49
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 191.38,
                    "high": 194.2,
                    "low": 186.1,
                    "close": 187.71,
                    "volume": 147668400,
                    "adjclose": 187.71
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 234.87,
                    "high": 236.7,
                    "low": 234.24,
                    "close": 236.51,
                    "volume": 5826141,
                    "adjclose": 236.51
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 236,
                    "high": 241.25,
                    "low": 232.41,
                    "close": 232.88,
                    "volume": 51449800,
                    "adjclose": 232.88
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 94.06,
                    "high": 93.74,
                    "low": 92.66,
                    "close": 92.72,
                    "volume": 5442212,
                    "adjclose": 92.72
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 94.06,
                    "high": 95.09,
                    "low": 92.78,
                    "close": 93.55,
                    "volume": 49056900,
                    "adjclose": 93.55
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287220,
                    "open": 254.04,
                    "high": 254.54,
                    "low": 252.21,
                    "close": 252.25,
                    "volume": 2151313,
                    "adjclose": 252.25
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 256.3,
                    "high": 257.69,
                    "low": 253.39,
                    "close": 254.15,
                    "volume": 21456400,
                    "adjclose": 254.15
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 182.87,
                    "high": 183.72,
                    "low": 181.43,
                    "close": 182.05,
                    "volume": 3384435,
                    "adjclose": 182.05
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 189,
                    "high": 190.36,
                    "low": 184.01,
                    "close": 184.51,
                    "volume": 35147300,
                    "adjclose": 184.51
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 81.07,
                    "high": 83.18,
                    "low": 82.28,
                    "close": 82.57,
                    "volume": 7965292,
                    "adjclose": 82.57
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 81.07,
                    "high": 84.85,
                    "low": 80.67,
                    "close": 82.11,
                    "volume": 70903700,
                    "adjclose": 82.11
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287216,
                    "open": 309.29,
                    "high": 310.31,
                    "low": 306.15,
                    "close": 306.72,
                    "volume": 423685,
                    "adjclose": 306.72
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 312.68,
                    "high": 314.3,
                    "low": 306.62,
                    "close": 308.47,
                    "volume": 4548900,
                    "adjclose": 308.47
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 94.12,
                    "high": 94.85,
                    "low": 94.13,
                    "close": 94.57,
                    "volume": 2933500,
                    "adjclose": 94.57
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 94.98,
                    "high": 95.67,
                    "low": 93.53,
                    "close": 93.86,
                    "volume": 27813400,
                    "adjclose": 93.86
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287221,
                    "open": 89.52,
                    "high": 87.73,
                    "low": 86.45,
                    "close": 86.94,
                    "volume": 3044251,
                    "adjclose": 86.94
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 89.52,
                    "high": 90.05,
                    "low": 88.2,
                    "close": 88.73,
                    "volume": 14487900,
                    "adjclose": 88.73
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287221,
                    "open": 42.38,
                    "high": 42.58,
                    "low": 42.03,
                    "close": 42.24,
                    "volume": 1319982,
                    "adjclose": 42.24
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 43.12,
                    "high": 43.68,
                    "low": 42.22,
                    "close": 42.46,
                    "volume": 13279000,
                    "adjclose": 42.46
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287223,
                    "open": 25.56,
                    "high": 25.65,
                    "low": 25.51,
                    "close": 25.61,
                    "volume": 1977421,
                    "adjclose": 25.61
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 25.84,
                    "high": 25.99,
                    "low": 25.5,
                    "close": 25.53,
                    "volume": 43145900,
                    "adjclose": 25.53
                }
            ],
            [
                {
                    "date": "03-08-2023",
                    "date_utc": 1678287222,
                    "open": 8.36,
                    "high": 8.55,
                    "low": 8.33,
                    "close": 8.41,
                    "volume": 7205110,
                    "adjclose": 8.41
                },
                {
                    "date": "03-07-2023",
                    "date_utc": 1678199400,
                    "open": 8.27,
                    "high": 8.43,
                    "low": 8.19,
                    "close": 8.28,
                    "volume": 26768200,
                    "adjclose": 8.28
                }
            ]
        ]
    );

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
                .then(response => {
                    // setDataFromDB(response.data)
                    // setDataFromDBMain(response.data)
                    let originalData = response.data;

                    const promises = [];
                    // for (let i = 0; i < response.data.length; i++) {
                    //     promises.push(axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${response.data[i].name}/1d`,{
                    //         headers: {
                    //             'X-RapidAPI-Key': '2ec4802eadmsh150ba6db791b984p1420a0jsn3ce76c9e86c1',
                    //             'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                    //         }
                    //     }));
                    // }

                    Promise.all(promises)
                        .then(apiResponses => {
                            setDataFromDB(dataFromAPI.map((response,index) => {
                                return {
                                    ...originalData[index],
                                    priceNow: response[Object.keys(response)[Object.keys(response).length - 1]].close,
                                    volume: response[Object.keys(response)[Object.keys(response).length - 1]].volume,
                                    changePrice: Math.floor( (((response[Object.keys(response)[Object.keys(response).length - 1]].close)-(response[Object.keys(response)[Object.keys(response).length - 2]].close))*100/(response[Object.keys(response)[Object.keys(response).length - 2]].close)) * 100) / 100
                                }
                            }));
                            setDataFromDBMain(dataFromAPI.map((response,index) => {
                              return {
                                  ...originalData[index],
                                  priceNow: response[Object.keys(response)[Object.keys(response).length - 1]].close,
                                  volume: response[Object.keys(response)[Object.keys(response).length - 1]].volume,
                                  changePrice: Math.floor( (((response[Object.keys(response)[Object.keys(response).length - 1]].close)-(response[Object.keys(response)[Object.keys(response).length - 2]].close))*100/(response[Object.keys(response)[Object.keys(response).length - 2]].close)) * 100) / 100
                              }
                           }));
                        }).catch(error => console.log(error));
                    }).catch(error => console.log(error));

    },[]);

    useEffect(()=>{

        if (searchInput != ''){
            let res = dataFromDBMain.filter(item => {
                return item.full_name.toLowerCase().includes(searchInput?.toLowerCase());
            });
            setDataFromDB(res);
        }
        if (searchInput == ''){
            setDataFromDB(dataFromDBMain);

        }

    },[searchInput]);

    useEffect(()=>{
            if (parentToChildFilterName == true){
                let arr = [...dataFromDB];
                const propComparator = (propName) =>
                    (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
                arr.sort(propComparator('full_name'));
                setDataFromDB(arr);
            }
            if (parentToChildFilterName == false) {
                let arr = [...dataFromDB];
                const propComparator = (propName) =>
                    (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
                arr.sort(propComparator('full_name'));
                setDataFromDB(arr);

            }
    },[parentToChildFilterName])

    useEffect(()=>{
        if (parentToChildFilterPrice == true){
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
            arr.sort(propComparator('priceNow'));
            setDataFromDB(arr);
        }
        if (parentToChildFilterPrice == false) {
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
            arr.sort(propComparator('priceNow'));
            setDataFromDB(arr);

        }
    },[parentToChildFilterPrice])

    useEffect(()=>{
        if (parentToChildFilterChange == true){
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
            arr.sort(propComparator('changePrice'));
            setDataFromDB(arr);
        }
        if (parentToChildFilterChange == false) {
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
            arr.sort(propComparator('changePrice'));
            setDataFromDB(arr);

        }
    },[parentToChildFilterChange])

    useEffect(()=>{
        if (parentToChildFilterTrades == true){
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
            arr.sort(propComparator('volume'));
            setDataFromDB(arr);
        }
        if (parentToChildFilterTrades == false) {
            let arr = [...dataFromDB];
            const propComparator = (propName) =>
                (a, b) => a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1
            arr.sort(propComparator('volume'));
            setDataFromDB(arr);

        }
    },[parentToChildFilterTrades])

    return(

        <Row className='list_stock_items'>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                {dataFromDB.length == 0 ? <h1 className="loading-header">Loading...</h1> : dataFromDB.map((element, index ) => <Row className="list_item d-flex align-items-center" key={element.name} >
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

                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream" valueiconticker={element.name}>{element.priceNow ? element.priceNow : <p className="loading">Loading...</p>}</Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream_change" valueicontickerchange={element.name}>{element.changePrice ? ` ${element.changePrice}%`:<p className="loading">Loading...</p>}</Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className="ticker_stream_volume d-none d-md-block ps-xl-5 ps-lg-5 ps-md-5 ps-sm-5" valueicontickertrades={element.name}>{element.volume ? element.volume : <p className="loading">Loading...</p>}</Col>
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

    )
}
export default StocksList;