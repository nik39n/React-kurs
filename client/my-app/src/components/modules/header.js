import {Link} from "react-router-dom";
import '../style/modules/header.css'
import React from "react";

function Header(){
    return(
        <div className="header">
            <div className="logo_name">
                <Link to='/main-page'>logo</Link>
                <img src="" alt=""/>
            </div>
            <div className="type_of_stock">
                <Link  to='/main-page/crypto' className="type_of_stock_item crypto">Crypto</Link>
                <Link to='/main-page/stocks' className="type_of_stock_item stocks">Stocks</Link>
                <div className="type_of_stock_item etc">etc</div>
            </div>
            <div className="header-cart">
                <div className="cart">cart</div>
                <Link to='/favourite' className="favourite">favourite</Link>
            </div>
        </div>
    )
}
export default Header;