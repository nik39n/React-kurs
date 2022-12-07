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

function MainDashboard () {
    const params = useParams();
    return(
        <div>
            <Header></Header>
            <Container>
                <Row className="main-content flex-md-wrap flex-lg-nowrap">
                    <Col xl={9} lg={9} md={9} sm={12} className="chart">
                        <MainChart name={params.tickerName}></MainChart>
                    </Col>

                    <Col xl={3} lg={3} md={3} sm={12} className="ticker ps-5 mt-md-5">
                        <ApiTicker name={params.tickerName}></ApiTicker>
                        <Performance name={params.tickerName}></Performance>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default MainDashboard;






    