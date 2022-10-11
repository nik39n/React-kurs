import React, { Component } from 'react';
import './apiticker.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";


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

    };
    client = new W3CWebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    componentWillMount() {
        let arr = [];

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
            this.props.parentCallback(arr);
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
                <div className="block-name">
                    <div className="ticker-head">
                        <img src="https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg" alt="" className="ticker-icon"/>
                        <div className="ticker-name">{this.state.items.s}</div>
                    </div>
                    <div className="ticker-description">
                        <div className="description-main">
                            <a href="https://bitcoin.org/uk/" className="company-name__link"><div className="company-name">Bitcoin / TetherUS</div></a>
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
                            <div className={"live-price "+this.state.className}>
                                {Math.round(this.state.items.c)}
                            </div>
                            <div className="price-currency">USD</div>
                            <div className={"changed-price__24h "+this.state.classNameDifference}>
                                {Math.round(this.state.items.p)}
                            </div>
                            <div className={"changed-price__24h-percentage "+this.state.classNameDifferencePercantage}>
                                ({this.state.items.P +"%"})
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
                                Самая высокая цена: {Math.round(this.state.items.h)}
                            </div>
                            <div className="low-price">
                                Самая низкая цена: {Math.round(this.state.items.l)}
                            </div>
                            <div className="volume">
                                Объем торгов: {Math.round(this.state.items.v)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}



