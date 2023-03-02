import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MainChart from "./modules/mainchart";
import Performance from "./modules/performance";
import  { ApiTicker } from './modules/apiticker';
import Header from "./modules/header";
import './style/maindashboard.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import StockTiker from "./modules/stocktiker";
import MainChartStock from "./modules/mainschartstock";
import PerformanceStock from "./modules/performancestock";

function MainDashboardStock () {
    const params = useParams();
    return(
        <div>
            <Header></Header>
            <Container>
                <Row className="main-content flex-md-wrap flex-lg-nowrap">
                    <Col xl={9} lg={9} md={9} sm={12} className="chart">
                        <MainChartStock name={params.tickerName}></MainChartStock>
                    </Col>

                    <Col xl={3} lg={3} md={3} sm={12} className="ticker ps-5 mt-md-5">
                        <StockTiker name={params.tickerName}></StockTiker>
                        <PerformanceStock name={params.tickerName}></PerformanceStock>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default MainDashboardStock;






