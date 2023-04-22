import '../../style/modules/crypto/mainchart.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function MainChartStock(props) {
    let week = 657000;
    let halfYear = 15768000;
    let year = 31536000;
    let month = 2628000;

    let fiveMinutesInterval = '5m';
    let oneHourInterval = '1h';
    let dayInterval = '1d';
    let oneWeekInterval = '1wk';
    let oneMonthInterval = '1mo';

    const handleClickDayInterval = () => {
        setIntervalParam(dayInterval);
    };
    const handleClickOneHourInterval = () => {
        setIntervalParam(oneHourInterval);
    };
    const handleClickFiveMinutesInterval = () => {
        setIntervalParam(fiveMinutesInterval);
    };
    const handleClickOneWeekInterval = () => {
        setIntervalParam(oneWeekInterval);
    };
    const handleClickMonthInterval = () => {
        setIntervalParam(oneMonthInterval);
    };
    const handleClickYear = () => {

        setParamDistance(year);
    };
    const handleClickHalfYear = () => {
        setParamDistance(halfYear);
    };
    const handleClickMonth = () => {
        setParamDistance(month);
    };
    const handleClickWeek = () => {
        setParamDistance(week);
    };
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [paramDistance, setParamDistance] = useState(week);
    const [intervalParam, setIntervalParam] = useState(dayInterval)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${props.name}/${intervalParam}`,{
                headers: {
                    'X-RapidAPI-Key': '2ec4802eadmsh150ba6db791b984p1420a0jsn3ce76c9e86c1',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                         }
            });
            const entries = [Object.entries(data.items)]; // Array of array with data about point

            let dateRange = Math.floor((Date.now() / 1000) - paramDistance); // Number(timestamp) of range between current and point which is need

            let resData = [];

            entries[0].forEach((currentElement)=>{
                if (currentElement[0] > dateRange){   // loop with generation necessary count of data point RETURN ARRAY with data
                    resData.push(currentElement);
                }
            });

            setChartData({
                labels: resData.map((item)=>(item[1].date)), // ARRAY this is signs of date in bottom of diagram
                datasets: [
                    {
                        label: props.name, // STRING name of ticker
                        data: resData.map((item)=>(item[1].close)), // ARRAY of date-points on diagram
                        fill:true,
                        borderColor:"rgba(99,112,255,0.82)",
                        // backgroundColor:"rgba(255.99.132,0.3)"
                    }
                ]
            });
            setIsLoading(false);
        }
        fetchData();
    },[paramDistance,intervalParam])
    return(
        <div className="main_chart">
            <div className="chart">
                {isLoading ? <h1>Loading</h1>:<Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins:{
                            legend:{position:"top"},
                            title:{display:true}

                        },
                    }}
                />}
            </div>
            <div className="chart_buttons">
                <div className="time_buttons">
                    <p>Period:</p>
                    <button onClick={handleClickYear}>1Y</button>
                    <button onClick={handleClickHalfYear}>6M</button>
                    <button onClick={handleClickMonth}>1M</button>
                    <button onClick={handleClickWeek}>1W</button>
                </div>
                <div className="interval_buttons">
                    <p>Interval:</p>
                    <button onClick={handleClickMonthInterval}>1mo</button>
                    <button onClick={handleClickOneWeekInterval}>1wk</button>
                    <button onClick={handleClickDayInterval}>1d</button>
                    <button onClick={handleClickOneHourInterval}>1h</button>
                    <button onClick={handleClickFiveMinutesInterval}>5m</button>
                </div>
            </div>
        </div>

    )
}
export default MainChartStock;

