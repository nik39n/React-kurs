import React, {useEffect, useState} from "react";
import './style/mainpage.css';
import Header from "./modules/header";
import {Link, useParams} from "react-router-dom";
import Cryptolist from "./modules/crypto/cryptolist";
import StocksList from "./modules/stocks/stockslist";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Col, Row, Container } from "@kunukn/react-bootstrap-grid";

function MainPage () {
 const params = useParams();
 const [searchInputData, setSearchInputData] = useState('');
 const [searchInput, setSearchInput] = useState("");
 const [priceFilter, setPriceFilter] = useState();
 const [nameFilter, setNameFilter] = useState();
 const [changeFilter, setChangeFilter] = useState();
 const [tradesFilter, setTradesFilter] = useState();
 const [childData , setChildData] = useState('');
 const [dataToList, setDataToList] = useState();

 const handleInputChange = (e) => {
     setSearchInputData(e.target.value);
     console.log(searchInputData);
 }

 const childToParent = (childData) => {
    setChildData(childData);
 }
    const handleChange = (e) => {
        setSearchInput(e.target.value);
        let arr = [];
        childData.forEach((element)=>{
            let ticker = Object.keys(element);
            let name = Object.values(element);
            if (ticker[0].toLowerCase().match((e.target.value).toLowerCase()) || name[0].toLowerCase().match((e.target.value).toLowerCase())){
                arr.push(element);
            }
        });
        // childData.filter((country) => {
        //     if(country.match(e.target.value)!= null){
        //         arr.push(country.match(e.target.value));
        //
        //     };
        // });
        setDataToList(arr);
    };
     const handelName = (e) => {
         if (nameFilter == undefined){
             setNameFilter(true);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);



         } else if(nameFilter == true){
             setNameFilter(false);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);



         } else if (nameFilter == false) {
             setNameFilter(true);

             setPriceFilter(undefined);
             setChangeFilter(undefined);
             setTradesFilter(undefined);



         }
     }
    const handelPrice = (e) => {
        if (priceFilter == undefined){
            setPriceFilter(true);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);


        } else if(priceFilter == true){
            setPriceFilter(false);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);


        } else {
            setPriceFilter(true);

            setNameFilter(undefined);
            setChangeFilter(undefined);
            setTradesFilter(undefined);

        }
    }
    const handelChange = (e) => {
        if (changeFilter == undefined){
            setChangeFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);


        } else if(changeFilter == true){
            setChangeFilter(false);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);

        } else {
            setChangeFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setTradesFilter(undefined);

        }
    }
    const handelTrades = (e) => {
        if (tradesFilter == undefined){
            setTradesFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);

        } else if(tradesFilter == true){
            setTradesFilter(false);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);

        } else {
            setTradesFilter(true);

            setNameFilter(undefined);
            setPriceFilter(undefined);
            setChangeFilter(undefined);

        }
    }



    return(
        <div className="main">
            <Header></Header>
            <Container className="cover">
                <Row className="section_above_list">
                    <Col xl={{span: 2}} lg={{span:2}} md={{span:4}} sm={{span:4}} xs={12} className="name_of_market d-flex">
                        <h1>{params.typeActives.toUpperCase()}</h1>
                    </Col>
                    <Col xl={{span:2, offset: 8}} lg={{span:2, offset:8}} md={{span:4,offset:4}} sm={{span:4,offset:4}} xs={{span:12}}  className="search">
                        {params.typeActives == "crypto" ? <input type="text" placeholder="Search" onChange={handleChange} value={searchInput} className="search_input"/> :
                            <input type="text" placeholder="Search" onChange={handleInputChange} value={searchInputData} className="search_input"/>}
                    </Col>
                </Row>
                <Row className="list_of_actives">
                    <Row className="filters">
                        <Col xl={{span:5}}  lg={{span:3}} md={{span:4}} sm={{span:6}}  xs={{span:7}}onClick={handelName} className="filter_item filter_item_name"><p className="filter_item_wrapper">Name</p></Col>
                        <Col xl={{span:2}}  lg={{span:2}} md={{span:2}} sm={{span:2}} xs={{span:2}} onClick={handelPrice} className="filter_item filter_item_price"><p className="filter_item_wrapper">Price</p></Col>
                        <Col xl={{span:2}}  lg={{span:3}} md={{span:2}} sm={{span:2}} xs={{span:2}} onClick={handelChange} className="filter_item filter_item_change"><p className="filter_item_wrapper">24h/Change</p></Col>
                        <Col xl={{span:2}}  lg={{span:2}} md={{span:2}} onClick={handelTrades} className="filter_item filter_item_trades d-none d-md-flex pe-xl-5 pe-md-3"><p className="filter_item_wrapper">Trades</p></Col>
                        <Col xl={{span:2}} lg={{span:2}} md={{span:1}} sm={{span:1}} xs={{span:0}} ></Col>
                    </Row>
                    {
                        params.typeActives == "crypto" ? <Cryptolist parentToChildInput={dataToList} parentToChildFilterName={nameFilter} parentToChildFilterPrice={priceFilter} parentToChildFilterChange={changeFilter} parentToChildFilterTrades={tradesFilter}  childToParent={childToParent}></Cryptolist>
                            : <StocksList searchInput={searchInputData} parentToChildInput={dataToList} parentToChildFilterName={nameFilter} parentToChildFilterPrice={priceFilter} parentToChildFilterChange={changeFilter} parentToChildFilterTrades={tradesFilter}  childToParent={childToParent}></StocksList>
                    }
                </Row>
            </Container>
        </div>

    )
}
export default MainPage;
