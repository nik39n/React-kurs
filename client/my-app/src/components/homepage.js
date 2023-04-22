import React, {useEffect, useState} from "react";
import './style/homepage.css';
import Header from "./modules/header";
import {Link, useParams} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

function HomePage () {

    const params = useParams();

    const [dbData, setDbData] = useState('');
    const [dbStockData, setDbStockData] = useState('')

    useEffect(()=>{
        const fetchDataDb = async ()=>{
            let dbinfo = await axios.get(`http://localhost/country`);
            let dbstocksinfo = await axios.get(`http://localhost/stocks-cap`);
            if (dbinfo != undefined){
                setDbData(dbinfo.data);
            }
            if (dbstocksinfo != undefined){
                setDbStockData(dbstocksinfo.data);
            }
            console.log(dbStockData);
        }
        fetchDataDb();

    })


    return(
        <div className="main">
            <Header></Header>
            <Container className="cover">
                <Row className="page-header">
                    <h1 className="title_home_page">
                        World Economy
                    </h1>
                </Row>
                <Row className="first_analytic_gdp_rates">

                    <Col xl={6} lg={6} md={6} sm={12} >
                        <Row className="gdp_list_elem_cover">
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <h3 className="title_section">GDP</h3>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} className="gdp_col">
                                {dbData ? dbData.map(element =>
                                    <div className="gdp_list_elem">
                                        <div className="img_gdp_list_elem">
                                            <img src={element.img} alt=""/>
                                        </div>
                                        <div className="info_gdp_list_elem">
                                            <div className="country_name">
                                                {element.name_country}
                                            </div>
                                            <div className="number">
                                                <span>{(element.gdp_country)/1000000000000}T</span><span className="usd_ticker"> USD</span>
                                            </div>

                                        </div>
                                    </div>
                                ) : <p>Empty</p>}
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={6} lg={6} md={6} sm={12} className="interest_rates_col">
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h3 className="title_section">Interest rate</h3>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} className="gdp_col">
                            {dbData ? dbData.map(element =>
                                <div className="gdp_list_elem">
                                    <div className="img_gdp_list_elem">
                                        <img src={element.img} alt=""/>
                                    </div>
                                    <div className="info_gdp_list_elem">
                                        <div className="country_name">
                                            {element.name_country}
                                        </div>
                                        <div className="number">
                                            <span>{element.interest_rates}</span><span className="usd_ticker"> %</span>
                                        </div>

                                    </div>
                                </div>
                            ) : <p>Empty</p>}
                        </Col>
                    </Col>

                </Row>
                <Row className="second_analytic_inflation_rates">

                    <Col xl={6} lg={6} md={6} sm={12} className="inflation_rate">
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h3 className="title_section">Inflation rate</h3>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} className="gdp_col">
                            {dbData ? dbData.map(element =>
                                <div className="gdp_list_elem">
                                    <div className="img_gdp_list_elem">
                                        <img src={element.img} alt=""/>
                                    </div>
                                    <div className="info_gdp_list_elem">
                                        <div className="country_name">
                                            {element.name_country}
                                        </div>
                                        <div className="number">
                                            <span>{element.inflation_rate}</span><span className="usd_ticker"> %</span>
                                        </div>

                                    </div>
                                </div>
                            ) : <p>Empty</p>}
                        </Col>
                    </Col>

                    <Col xl={6} lg={6} md={6} sm={12} className="unemployment_rate">
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h3 className="title_section">Unemployment rate</h3>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} className="gdp_col">
                            {dbData ? dbData.map(element =>
                                <div className="gdp_list_elem">
                                    <div className="img_gdp_list_elem">
                                        <img src={element.img} alt=""/>
                                    </div>
                                    <div className="info_gdp_list_elem">
                                        <div className="country_name">
                                            {element.name_country}
                                        </div>
                                        <div className="number">
                                            <span>{element.unemployment_rate}</span><span className="usd_ticker"> %</span>
                                        </div>

                                    </div>
                                </div>
                            ) : <p>Empty</p>}
                        </Col>
                    </Col>

                </Row>
                <Row className="third_analytic_world_companies">

                    <Row className="title_section">
                        <h3 className="title_section">World biggest companies</h3>
                    </Row>

                    <Row className="filters_list">
                        <Col xl={6} lg={6} md={6} sm={6}  className="symbol d-flex justify-content-start">
                            Symbol
                        </Col>

                        <Col xl={6} lg={6} md={6} sm={6} className="market_cap">
                            Market Capitalisation
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="world_biggest_companies">

                            {dbStockData ? dbStockData.map(element =>
                                <Link className="company_list d-flex align-items-center" to={"/ticker-details-stock/"+element.name.trim()}>
                                    <Col xl={6} lg={6} md={6} sm={6}  className="d-flex justify-content-start">
                                        <div className="stock_list_elem">
                                            <div className="img_gdp_list_elem">
                                                <img src={element.img} alt=""/>
                                            </div>
                                            <div className="info_gdp_list_elem">
                                                <div className="country_name">
                                                    {element.full_name}
                                                </div>
                                                <div className="ticker_name_main">
                                                    <span className="ticker_name_span">{element.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xl={6} lg={6} md={6} sm={6} className="market_cap_number">
                                        <div className="market_cap_number">
                                            <span>{((element.market_cap)/1000000000).toFixed(1)}B</span><span className="usd_ticker"> USD</span>
                                        </div>
                                    </Col>
                                </Link>

                            ) : <p>Empty</p>}
                        </Col>
                    </Row>


                </Row>
            </Container>
        </div>

    )
}
export default HomePage;
