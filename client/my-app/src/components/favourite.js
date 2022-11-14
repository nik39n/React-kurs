import './style/favourite.css';
import Header from "./modules/header";
import { useCookies } from 'react-cookie';
import {Link} from "react-router-dom";
import React from "react";


function Favourite() {
    const [cookies, setCookie] = useCookies([]);
    return(
        <div className='main'>
            <Header>

            </Header>
            <div className='container'>
                {cookies.activeslist ?
                    cookies.activeslist.map(element => <div className="list_item">
                        <Link to={"/ticker-details/"+element.trim()} key={element} className="list_item_link" > {element} </Link>
                        </div>): <h1>Loading</h1>}
            </div>
        </div>

    )
}
export default Favourite