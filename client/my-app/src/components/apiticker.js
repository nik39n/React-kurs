import React, { Component } from 'react';

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
            <div>
                <div>Price:{this.state.items.p}</div>
                <div>Name: {this.state.items.s}</div>
                <div>Изменение за 24 часа: {Math.round(this.state.items.P)+"%"}</div>
                <div>Самая высокая цена: {this.state.items.h}</div>
                <div>Самая низкая цена: {this.state.items.l}</div>
                <div>Объем торгов: {this.state.items.v}</div>
            </div>

        );
    }
}

export default ApiTicker;


