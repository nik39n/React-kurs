import React, {useEffect, useState} from "react";
import axios from "axios";
import mainchart from "./modules/mainchart";
import {Link} from "react-router-dom";
import {Line} from "react-chartjs-2";

function MainPage () {
 const [dbdata, setDbdata] = useState();
 const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
      const fetchData = async () => {
           let data3 = await axios.get(`http://localhost/test`);
           setDbdata(data3.data.map((item)=>(`${item['name']}`)));
           setIsLoading(false);
      }
  fetchData();
 },[])
    return(
        <div>
            {isLoading ? <h1>Loading</h1>: dbdata.map(element => <div><Link to={"/ticker-details/"+element.trim()} key={element} > {element} </Link></div>)}
        </div>

    )
}
export default MainPage;
