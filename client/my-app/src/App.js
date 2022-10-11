import './App.css';
import MainChart from './components/mainchart';
import {MainDashboard} from "./components/maindashboard";
import {ApiTicker} from "./components/apiticker";
import React from "react";

// function updateData(value) {
//     return this.setState({ name: value })
// }
// const pull_data = (data) => {
//     console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
// }

function App() {
    const price = [1234,1241,4632,563];
  return (
    <div className="App">
      <p>Привет</p>
      <MainDashboard></MainDashboard>
    </div>
  );
}

export default App;
