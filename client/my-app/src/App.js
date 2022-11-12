import './App.css';
import MainChart from './components/modules/mainchart';
import MainDashboard from "./components/maindashboard";
import {ApiTicker} from "./components/modules/apiticker";
import MainPage from "./components/mainpage";
import {Route} from "react-router-dom";
import React from "react";

function App() {




  return (
    <div className="App">
        <Route path="/main-page">
            <MainPage></MainPage>
        </Route>
        <Route path="/ticker-details/:tickerName">
            <MainDashboard/>
        </Route>

    </div>
  );
}

export default App;
