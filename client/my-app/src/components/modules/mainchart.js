import '../style/mainchart.css';
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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function MainChart() {
    let weekInSeconds = 605201819;
    let halfYearInSeconds = 15778476000;
    let yearInSeconds = 31556952000;
    let monthInSeconds = 2629743000;

        let dayInterval = '1d';
    let eightHoursInterval = '8h';
    let oneWeekInterval = '1w';
    let threeDaysInterval = '3d';
    let oneHourInterval = '1h';

    const handleClickDayInterval = () => {
        setIntervalParam(dayInterval);
    };
    const handleClickOneHourInterval = () => {
        setIntervalParam(oneHourInterval);
    };
    const handleClickEightHoursInterval = () => {
        setIntervalParam(eightHoursInterval);
    };
    const handleClickOneWeekInterval = () => {
        setIntervalParam(oneWeekInterval);
    };
    const handleClickThreeDaysInterval = () => {
        setIntervalParam(threeDaysInterval);
    };
    const handleClickYear = () => {

        setParamSeconds(yearInSeconds);
    };
    const handleClickHalfYear = () => {
        setParamSeconds(halfYearInSeconds);
    };
    const handleClickMonth = () => {
        setParamSeconds(monthInSeconds);
    };
    const handleClickWeek = () => {
        setParamSeconds(weekInSeconds);
    };
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [paramSeconds, setParamSeconds] = useState(weekInSeconds);
    const [intervalParam, setIntervalParam] = useState(eightHoursInterval)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${intervalParam}&startTime=${Date.now() - paramSeconds}&limit=500`)
            setChartData({
                labels: data.map((item)=>(`${new Date(item[0]).getDate()}/${new Date(item[0]).getMonth() + 1}` )),
                datasets: [
                    {
                        label:"BTC",
                        data: data.map(item=>item[4]),
                        fill:true,
                        borderColor:"rgb(255,99,132)",
                        backgroundColor:"rgba(255.99.132,0.3)"
                    }
                ]
            });
            setIsLoading(false);
        }
        fetchData()
    },[paramSeconds,intervalParam])
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
                    <button onClick={handleClickYear}>1Y</button>
                    <button onClick={handleClickHalfYear}>6M</button>
                    <button onClick={handleClickMonth}>1M</button>
                    <button onClick={handleClickWeek}>1W</button>
                </div>
                <div className="interval_buttons">
                    <button onClick={handleClickOneWeekInterval}>1w</button>
                    <button onClick={handleClickThreeDaysInterval}>3d</button>
                    <button onClick={handleClickDayInterval}>1d</button>
                    <button onClick={handleClickEightHoursInterval}>8h</button>
                    <button onClick={handleClickOneHourInterval}>1h</button>
                </div>
            </div>
        </div>

    )
}
export default MainChart;

