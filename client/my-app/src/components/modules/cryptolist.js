import {Link, useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';

import React, {useEffect, useState} from "react";
import axios from "axios";

function CryptoList(){
    const [dbdata, setDbdata] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies([]);

    const handle = (event) => {
        if (cookies.activeslist == undefined){
            setCookie('activeslist', [event.target.getAttribute('value')], { path: '/' });
            console.log(cookies);
        } else {
            if (cookies.activeslist.includes(event.target.getAttribute('value'))){
                let index = cookies.activeslist.indexOf(event.target.getAttribute('value'));
                if (index !== -1) {
                    cookies.activeslist.splice(index, 1);
                }
                setCookie('activeslist', cookies.activeslist, { path: '/' });
            } else {
                cookies.activeslist.push(event.target.getAttribute('value'))
                setCookie('activeslist', cookies.activeslist, { path: '/' });
            }
        }
        console.log(cookies.activeslist)
    };

    useEffect(()=>{
        const fetchData = async () => {
            let data1 = await axios.get(`http://localhost/crypto`);
            setDbdata(data1.data.map((item)=>(`${item['name']}`)));
            setIsLoading(false);
        }
        fetchData();
    },[])

    return(
     <div>
         {isLoading ? <h1>Loading</h1>:
             dbdata.map(element => <div className="list_item">
                 <Link to={"/ticker-details/"+element.trim()} key={element} className="list_item_link" > {element} </Link>
                 <div className="cart">
                     <div className="list_cart">cart</div>
                     <button onClick={handle} className="list_favourite" value={element}>favourite</button>
                 </div></div>)}
     </div>

 )
}
export default CryptoList;