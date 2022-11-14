import './App.css';
import MainChart from './components/modules/mainchart';
import MainDashboard from "./components/maindashboard";
import {ApiTicker} from "./components/modules/apiticker";
import MainPage from "./components/mainpage";
import Favourite from "./components/favourite";
import {Route, Redirect, Switch} from "react-router-dom";
import React from "react";

function App() {




  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
                <Redirect to='/main-page/crypto' />
            </Route>
            <Route exact path="/main-page">
                <Redirect to='/main-page/crypto' />
            </Route>
            <Route exact path="/main-page/:typeActives">
                <MainPage/>
            </Route>
            <Route path="/ticker-details/:tickerName">
                <MainDashboard/>
            </Route>
            <Route path="/favourite">
                <Favourite></Favourite>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
