import {Link} from "react-router-dom";
import '../style/modules/header.css'
import React from "react";

function Header(){
    return(
        <div className="header">
            <div className="logo_name">
                <Link to='/'><img src={require("../../analytic.png")} alt="" className='logo'/></Link>
            </div>
            <div className="type_of_stock">
                <Link  to='/main-page/crypto' className="type_of_stock_item crypto">Crypto</Link>
                <Link to='/main-page/stocks' className="type_of_stock_item stocks">Stocks</Link>
                <div className="type_of_stock_item etc">etc</div>
            </div>
            <div className="header-cart">
                <Link to='/favourite' className="favourite">
                    <div className="favourite_title">Favourite</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px" className="svg_icon_header">
                        <path  className="svg_icon_header svg_icon_black"  stroke="#111111" d="M17.56248,21.55957a1.00275,1.00275,0,0,1-.46531-.11475L12,18.76514,6.90283,21.44482a1.00019,1.00019,0,0,1-1.45117-1.0542l.97363-5.67578-4.12353-4.019a1.00033,1.00033,0,0,1,.5542-1.706l5.69873-.82813L11.103,2.99805a1.04173,1.04173,0,0,1,1.79394,0l2.54834,5.16357,5.69873.82813a1.00033,1.00033,0,0,1,.5542,1.706l-4.12353,4.019.97363,5.67578a1,1,0,0,1-.98586,1.169Z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}
export default Header;