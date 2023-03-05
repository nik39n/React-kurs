import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MainChart from "./modules/crypto/mainchart";
import Performance from "./modules/crypto/performance";
import  { ApiTicker } from './modules/crypto/apiticker';
import Header from "./modules/header";
import './style/maindashboard.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import StockTiker from "./modules/stocks/stocktiker";
import MainChartStock from "./modules/stocks/mainschartstock";
import PerformanceStock from "./modules/stocks/performancestock";
import EarningsDiagramStock from "./modules/stocks/earningsdiagramstock";
import RevenueDiagramStock from "./modules/stocks/revenuediagramstock";
import Profilestock from "./modules/stocks/profilestock";
import ProfileStock from "./modules/stocks/profilestock";

function MainDashboardStock () {
    const params = useParams();
    return(
        <div>
            <Header></Header>
            <Container>
                <Row className="main-content flex-md-wrap flex-lg-nowrap">
                    <Col xl={8} lg={8} md={8} sm={12} className="chart">
                        <MainChartStock name={params.tickerName}></MainChartStock>
                        <ProfileStock name={params.tickerName}></ProfileStock>
                    </Col>

                    <Col xl={4} lg={4} md={4} sm={12} className="ticker ps-5 mt-md-5">
                        <StockTiker name={params.tickerName}></StockTiker>
                        <PerformanceStock name={params.tickerName}></PerformanceStock>
                        <EarningsDiagramStock name={params.tickerName}></EarningsDiagramStock>
                        <RevenueDiagramStock name={params.tickerName}></RevenueDiagramStock>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default MainDashboardStock;






