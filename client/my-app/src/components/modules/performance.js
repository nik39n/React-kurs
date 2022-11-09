import axios from "axios";
import React, {useEffect, useState} from "react";
import "../style/performance.css";


function Performance(){
    const [priceYear, setPriceYear] = useState();
    const [priceHalfYear,setPriceHalfYear] = useState();
    const [priceThreeMonth, setPriceThreeMonth] = useState();
    const [priceOneMonth, setPriceOneMonth] = useState();
    const [priceOneWeek, setPriceOneWeek] = useState();
    const [priceYTD , setPriceYTD] = useState();
    const [priceToday, setPriceToday] = useState();

    const [priceYearPerformance, setPriceYearPerformance] = useState();
    const [priceHalfYearPerformance,setPriceHalfYearPerformance] = useState();
    const [priceThreeMonthPerformance, setPriceThreeMonthPerformance] = useState();
    const [priceOneMonthPerformance, setPriceOneMonthPerformance] = useState();
    const [priceOneWeekPerformance, setPriceOneWeekPerformance] = useState();
    const [priceYTDPerformance , setPriceYTDPerformance] = useState();

    const [dbdata, setDbdata] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            let data3 = await axios.get(`http://localhost/test`);
            let data2 = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=${1640995201000}&limit=1`);
            let {data} = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=${Date.now() - 31556926000}&limit=1000`);
            setDbdata(data3.data.map((item)=>(`  ${item['name']}`)));
            setPriceYear(data[0][1]);
            setPriceHalfYear(data[data.length-183][4]);
            setPriceThreeMonth(data[data.length-92][4]);
            setPriceOneMonth(data[data.length-31][4]);
            setPriceOneWeek(data[data.length-8][4]);
            setPriceToday(data[data.length-1][4]);
            setPriceYTD(data2.data[0][4]);
            let oneWeekPerformance = Math.floor((priceToday - priceOneWeek) * 100 / priceOneWeek * 100) / 100;
            let oneMonthPerformance = Math.floor((priceToday - priceOneMonth) * 100 / priceOneMonth * 100) / 100;
            let threeMonthPerformance = Math.floor((priceToday - priceThreeMonth) * 100 / priceThreeMonth * 100) / 100;
            let sixMonthPerformance = Math.floor((priceToday - priceHalfYear) * 100 / priceHalfYear * 100) / 100;
            let ytdPerformance = Math.floor((priceToday - priceYTD) * 100 / priceYTD * 100) / 100;
            let yearPerformance = Math.floor((priceToday - priceYear) * 100 / priceYear * 100) / 100;
            setPriceYearPerformance(yearPerformance);
            setPriceHalfYearPerformance(sixMonthPerformance);
            setPriceThreeMonthPerformance(threeMonthPerformance);
            setPriceOneMonthPerformance(oneMonthPerformance);
            setPriceOneWeekPerformance(oneWeekPerformance);
            setPriceYTDPerformance(ytdPerformance);
        }
        fetchData();
    },[priceYearPerformance,priceHalfYearPerformance,priceThreeMonthPerformance,priceOneMonthPerformance,priceOneWeekPerformance,priceYTDPerformance]);


    return(
      <div className="performance_block">
          <p className="performance_title">Performance</p>
          <div className="performance">
              <div className={`performance_card one-week ${priceOneWeekPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceOneWeekPerformance ? priceOneWeekPerformance : 0}%</p>
                  <p className="p_interval">1W</p>
              </div>
              <div className={`performance_card one-month ${priceOneMonthPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceOneMonthPerformance ? priceOneMonthPerformance : 0}%</p>
                  <p className="p_interval">1M</p>
              </div>
              <div className={`performance_card three-month ${priceThreeMonthPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceThreeMonthPerformance ? priceThreeMonthPerformance : 0}%</p>
                  <p className="p_interval">3M</p>
              </div>
              <div className={`performance_card six-month  ${priceHalfYearPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceHalfYearPerformance ? priceHalfYearPerformance : 0}%</p>
                  <p className="p_interval">6M</p>
              </div>
              <div className={`performance_card ytd ${priceYTDPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceYTDPerformance ? priceYTDPerformance : 0}%</p>
                  <p className="p_interval">YTD</p>
              </div>
              <div className={`performance_card one-year ${priceYearPerformance>0 ? " plus" : " minus"}`}>
                  <p className="performance_pricachange">{priceYearPerformance ? priceYearPerformance : 0}%</p>
                  <p className="p_interval">1Y</p>

              </div>
          </div>
          <p> {dbdata ? dbdata : 0}</p>
      </div>
    );
}
export default Performance;
