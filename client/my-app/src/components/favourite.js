import './style/favourite.css';
import Header from "./modules/header";
import { useCookies } from 'react-cookie';
import {Link} from "react-router-dom";
import React from "react";
import {element} from "prop-types";


function Favourite() {
    const [cookies, setCookie] = useCookies([]);

    const handle = (event) => {
        if (cookies.activeslist.includes(event.target.getAttribute('valuedelete'))){
            let index = cookies.activeslist.indexOf(event.target.getAttribute('valuedelete'));
            if (index !== -1) {
                cookies.activeslist.splice(index, 1);
            }
            setCookie('activeslist', cookies.activeslist, { path: '/' });
        }
        let elemdelete = document.getElementById(event.target.getAttribute('valuedelete'));
        elemdelete.parentElement.removeChild(elemdelete);
    };
    return(
        <div className='main'>
            <Header>
            </Header>
            <div className='container'>
                {cookies.activeslist ?
                    cookies.activeslist.map(element =>
                    <div className="list_item" id={element}>
                        {/*<img src={element.img} alt=""/>*/}
                        <div key={element} className="item_wrapper">
                            <Link to={"/ticker-details/"+element.trim()} className="list_item_link_favourite" > {element} </Link>
                            <div className="cart" >
                                <button onClick={handle} className="button_favourite" valuedelete={element}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>): <h1>Loading</h1>
                }
            </div>
        </div>

    )
}
export default Favourite