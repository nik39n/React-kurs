import React, { Component } from 'react';
import './apiticker.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";



export class ApiTicker extends React.Component {
    state = {
        items: []
      };
    client = new W3CWebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    componentWillMount() {

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        this.client.onmessage = (message) => {
            // console.log(JSON.parse(message['data']).p);
            this.setState({
                items: JSON.parse(message['data'])
              });
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
                            <div className="live-price">
                                {Math.round(this.state.items.c)}
                            </div>
                            <div className="price-currency">USD</div>
                            <div className="changed-price__24h">Изменение:{Math.round(this.state.items.p)}</div>
                            <div className="changed-price__24h-percentage">
                                Изменение за 24 часа: {Math.round(this.state.items.P)+"%"}
                            </div>
                        </div>
                        <div className="work-time">
                            Рынок открыт
                        </div>
                    </div>

                    <div className="key-stat">
                        <div className="high-price">
                            Самая высокая цена: {this.state.items.h}
                        </div>
                        <div className="low-price">
                            Самая низкая цена: {this.state.items.l}
                        </div>
                        <div className="volume">
                            Объем торгов: {this.state.items.v}
                        </div>
                    </div>
                </div>

                {/*<div>Цена:{this.state.items.p}</div>*/}
                {/*<div>Название: {this.state.items.s}</div>*/}
                {/*<div>*/}
                {/*    <div>Статистика</div>*/}
                {/*    <div>Изменение за 24 часа: {Math.round(this.state.items.P)+"%"}</div>*/}
                {/*    <div>Самая высокая цена: {this.state.items.h}</div>*/}
                {/*    <div>Самая низкая цена: {this.state.items.l}</div>*/}
                {/*    <div>Объем торгов: {this.state.items.v}</div>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default ApiTicker;


