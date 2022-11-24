import React, { Component } from 'react';
import {useParams} from 'react-router-dom';
import '../style/modules/apiticker.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";


export class ApiTicker extends React.Component {
    state = {
        items: [{
            p:0,
            c:0,
            P:0,
        }],
        classNamePrice: 'changed-price__24h--neutral ',
        classNameDifference: 'changed-price__24h--neutral ',
        classNameDifferencePercantage: 'changed-price__24h--neutral ',
        info:[],
    };
    client = new W3CWebSocket(`wss://stream.binance.com:9443/ws/${this.props.name.toLowerCase()}@ticker`);

    componentWillMount() {
        let arr = [];

        const fetchData = async ()=>{
            let dbinfo = await axios.get(`http://localhost/crypto`);
            if (dbinfo != undefined){
                dbinfo.data.forEach((elem)=>{
                    if ((elem.name).toLowerCase() == (this.props.name).toLowerCase()){
                        this.setState({
                            info:elem,
                        })
                    }
                });
            }
        }
        fetchData();

        this.client.onopen = () => {
        console.log('WebSocket Client Connected');


        this.setState({
            className:" changed-price__24h--neutral",
            classNameDifference:" changed-price__24h--neutral",
            classNameDifferencePercantage: " changed-price__24h--neutral"

        });
        };

        this.client.onmessage = (message) => {
            let res = JSON.parse(message['data']);
            arr.push(res.c);
            // this.props.parentCallback(arr);
            this.setState({
                items: res
            })
            if (Math.round(this.state.items.c)<Math.round(res.c)) {
                this.setState({
                    className:" changed-price__24h--plus"

                });
            } else if (Math.round(this.state.items.c)==Math.round(res.c)){
                this.setState({
                    className:" changed-price__24h--neutral"

                });
            }
             else  {
                this.setState({
                    className:" changed-price__24h--minus"
                });
            };

            if (this.state.items.p<0){
                this.setState({
                    classNameDifference:" changed-price__24h--minus"
                });
            }else if (this.state.items.p==0) {
                this.setState({
                    classNameDifference: " changed-price__24h--neutral"

                });
            } else if (this.state.items.p>0) {
                this.setState({
                    classNameDifference:" changed-price__24h--plus"
                });
            };

            if (this.state.items.P<0) {
                this.setState({
                    classNameDifferencePercantage: " changed-price__24h--minus"
                });
            } else if (this.state.items.P==0) {
                this.setState({
                    classNameDifferencePercantage: " changed-price__24h--neutral"
                });
            } else if (this.state.items.P>0){
                this.setState({
                    classNameDifferencePercantage:" changed-price__24h--plus"
                });
            };
        };
    }
    render() {
        return (
            <div className="main-dashboard">
                {/*{this.state.info.name ? this.state.info.name : <h1>load</h1> }*/}
                <div className="block-name">
                    <div className="ticker-head">
                        <img src={this.state.info.img ? this.state.info.img : <span>load</span> } alt="" className="ticker-icon"/>
                        <div className="ticker-name">{this.state.items.s}</div>
                    </div>
                    <div className="ticker-description">
                        <div className="description-main">
                            <a href="client/my-app/src/components/modules/apiticker" className="company-name__link"><div className="company-name">{this.state.info.full_name ? this.state.info.full_name : <span>load</span> } / TetherUS</div></a>
                            <div className="dotwrap"></div>
                            <div className="market-name">BINANCE</div>
                        </div>
                        <div className="sector-name">
                            Crypto
                        </div>
                    </div>
                </div>

                <div className="block-main">

                    <div className="main-stat">
                        <div className="price">
                            <div className={"live-price " + this.state.className}>
                                {this.state.items.c ? Math.floor(this.state.items.c * 1000000) / 1000000 : 0 }
                            </div>
                            <div className="price-currency">USD</div>
                            <div className={"changed-price__24h "+this.state.classNameDifference}>
                                {this.state.items.p ? Math.floor(this.state.items.p * 100) / 100: 0}
                            </div>
                            <div className={"changed-price__24h-percentage "+this.state.classNameDifferencePercantage}>
                                ({(this.state.items.P ? Math.floor(this.state.items.P * 100) / 100 :0)  +"%"})
                            </div>
                        </div>
                        <div className="work-time">
                            <div className="marker_market"></div>
                            <div className="work-time-status">Рынок открыт</div>

                        </div>
                    </div>

                    <div className="key-stat">
                        <div className="title_key-stat">Статистика</div>
                        <div className="main_key-stat">
                            <div className="high-price">
                                Самая высокая цена: {(this.state.items.h ? Math.floor(this.state.items.h) :0)}
                            </div>
                            <div className="low-price">
                                Самая низкая цена: {(this.state.items.l ? Math.floor(this.state.items.l) :0)}
                            </div>
                            <div className="volume">
                                Объем торгов: {(this.state.items.v ? Math.floor(this.state.items.v) :0)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



