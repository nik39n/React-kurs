import axios from "axios";
import React, {useEffect, useState} from "react";
import "../../style/modules/crypto/performance.css";


function PerformanceStock(props){
    const [priceYear, setPriceYear] = useState();
    const [priceHalfYear,setPriceHalfYear] = useState();
    const [priceThreeMonth, setPriceThreeMonth] = useState();
    const [priceOneMonth, setPriceOneMonth] = useState();
    const [priceOneWeek, setPriceOneWeek] = useState();
    const [priceYTD , setPriceYTD] = useState();
    const [priceToday, setPriceToday] = useState();

    const [entries, setEntries] = useState();

    const [financialInfo,setFinancialInfo] = useState();

    let week = 657000;
    let halfYear = 15768000;
    let year = 31536000;
    let month = 2628000;

    const [isLoading, setIsLoading] = useState(true);
    const [priceYearPerformance, setPriceYearPerformance] = useState();
    const [priceHalfYearPerformance,setPriceHalfYearPerformance] = useState();
    const [priceThreeMonthPerformance, setPriceThreeMonthPerformance] = useState();
    const [priceOneMonthPerformance, setPriceOneMonthPerformance] = useState();
    const [priceOneWeekPerformance, setPriceOneWeekPerformance] = useState();
    const [priceYTDPerformance , setPriceYTDPerformance] = useState();


    useEffect(()=>{
        const fetchData = async () => {
            const { data } = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${props.name}/1d`,{
                headers: {
                    'X-RapidAPI-Key': '2ec4802eadmsh150ba6db791b984p1420a0jsn3ce76c9e86c1',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });
            let apiStockTicker = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data`,{
                headers: {
                    'X-RapidAPI-Key': '2ec4802eadmsh150ba6db791b984p1420a0jsn3ce76c9e86c1',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });
            setFinancialInfo(apiStockTicker);
            const entries = [Object.entries(data.items)]; // Array of array with data about all points
            setEntries(entries);

            let dateMonthLess = new Date(entries[0][(entries[0].length)-2][0]*1000);
            dateMonthLess.setMonth(dateMonthLess.getMonth()-1);

            let dateYearLess = new Date(entries[0][(entries[0].length)-2][0]*1000);
            dateYearLess.setFullYear(dateYearLess.getFullYear()-1);

            let dateThreeMonthLess = new Date(entries[0][(entries[0].length)-2][0]*1000);
            dateThreeMonthLess.setMonth(dateThreeMonthLess.getMonth()-3);

            let dateWeekLess = new Date(entries[0][(entries[0].length)-2][0]*1000);
            dateWeekLess.setDate(dateWeekLess.getDate()-7);

            let dateHalfYearLess = new Date(entries[0][(entries[0].length)-2][0]*1000);
            dateHalfYearLess.setMonth(dateHalfYearLess.getMonth()-6);

            let dateYTDLess = new Date(1672756200000);

            function dayCheck (date,data){
                let dateLessUTC = 0;
                let res = [];
                if (date.getDay()>0 && date.getDay()<6){
                    dateLessUTC = date.getTime();
                } else {
                    date.setDate(date.getDate()+2);
                    dateLessUTC = date.getTime();
                }
                entries[0].forEach((currentElement)=>{
                    if (currentElement[0] == dateLessUTC/1000){   // loop with generation necessary count of data point RETURN ARRAY with data
                        res=currentElement;
                    }
                });
                return res;
            }


            setPriceYear(dayCheck(dateYearLess,entries[0])[1].close);
            setPriceHalfYear(dayCheck(dateHalfYearLess,entries[0])[1].close);
            setPriceThreeMonth(dayCheck(dateThreeMonthLess,entries[0])[1].close);
            setPriceOneMonth(dayCheck(dateMonthLess,entries[0])[1].close);
            setPriceOneWeek(dayCheck(dateWeekLess,entries[0])[1].close);
            setPriceToday(entries[0][(entries[0].length)-1][1].close);
            setPriceYTD(dayCheck(dateYTDLess,entries[0])[1].close);

            let oneWeekPerformance = Math.floor((priceToday - priceOneWeek) * 100 / priceOneWeek * 100) / 100;
            let oneMonthPerformance = Math.floor((priceToday - priceOneMonth) * 100 / priceOneMonth * 100) / 100;
            let threeMonthPerformance = Math.floor((priceToday - priceThreeMonth) * 100 / priceThreeMonth * 100) / 100;
            let sixMonthPerformance = Math.floor((priceToday - priceHalfYear) * 100 / priceHalfYear * 100) / 100;
            let ytdPerformance = Math.floor((priceToday - priceYTD) * 100 / priceYTD * 100) / 100;
            let yearPerformance = Math.floor((((priceToday - priceYear) * 100) / priceYear) * 100) / 100;

            setPriceYearPerformance(yearPerformance);
            setPriceHalfYearPerformance(sixMonthPerformance);
            setPriceThreeMonthPerformance(threeMonthPerformance);
            setPriceOneMonthPerformance(oneMonthPerformance);
            setPriceOneWeekPerformance(oneWeekPerformance);
            setPriceYTDPerformance(ytdPerformance);

            setIsLoading(false);
        }
        fetchData();
    },[]);


    return(
        <div className="performance_block">
            <div className="key-stat">
                <div className="title_key-stat">Statistic</div>
                <div className="main_key-stat">
                    <div className="high-price">
                        The highest price: {entries ? entries[0][(entries[0].length)-1][1].high : 0}
                    </div>
                    <div className="low-price">
                        The lowest price: {entries ? entries[0][(entries[0].length)-1][1].low : 0}
                    </div>
                    <div className="volume">
                        Value of trading: {entries ? entries[0][(entries[0].length)-1][1].volume : 0}
                    </div>
                    <div className="volume">
                        Total Cash: {financialInfo ? financialInfo.data.financialData.totalCash.raw : 0}
                    </div>
                    <div className="volume">
                        Total Debt: {financialInfo ? financialInfo.data.financialData.totalDebt.raw : 0}
                    </div>
                    <div className="volume">
                        Ebitda: {financialInfo ? financialInfo.data.financialData.ebitda.raw : 0}
                    </div>
                </div>
            </div>
            {/*<p className="performance_title">Performance</p>*/}
            {/*<div className="performance">*/}
            {/*    <div className={`performance_card one-week ${priceOneWeekPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceOneWeekPerformance ? priceOneWeekPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">1W</p>*/}
            {/*    </div>*/}
            {/*    <div className={`performance_card one-month ${priceOneMonthPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceOneMonthPerformance ? priceOneMonthPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">1M</p>*/}
            {/*    </div>*/}
            {/*    <div className={`performance_card three-month ${priceThreeMonthPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceThreeMonthPerformance ? priceThreeMonthPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">3M</p>*/}
            {/*    </div>*/}
            {/*    <div className={`performance_card six-month  ${priceHalfYearPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceHalfYearPerformance ? priceHalfYearPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">6M</p>*/}
            {/*    </div>*/}
            {/*    <div className={`performance_card ytd ${priceYTDPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceYTDPerformance ? priceYTDPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">YTD</p>*/}
            {/*    </div>*/}
            {/*    <div className={`performance_card one-year ${priceYearPerformance>0 ? " plus" : " minus"}`}>*/}
            {/*        <p className="performance_pricachange">{priceYearPerformance ? priceYearPerformance : 0}%</p>*/}
            {/*        <p className="p_interval">1Y</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
export default PerformanceStock;
