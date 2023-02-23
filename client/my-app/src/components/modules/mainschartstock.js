import '../style/modules/mainchart.css';
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
    let week = 7;
    let halfYear = 182;
    let year = 365;
    let month = 31;

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
                            'X-RapidAPI-Key': '30c2da4a55msh871baf4c2d8a78dp16021cjsn9e4fdc286002',
                            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                         }
            });
            const entries = Object.entries(data.items);
            console.log(entries);
            let date = new Date(entries[entries.length-1][1].date);
            console.log(date);
            // date.setDate(date.getDate() - paramDistance);
            console.log(date.setDate(date.getDate() - paramDistance));




            let res = entries.slice(entries.length - paramDistance, 1);

            setChartData({
                labels: res.map((item)=>(item[1].date)),
                datasets: [
                    {
                        label: props.name,
                        data: res.map((item)=>(item[1].close)),
                        fill:true,
                        borderColor:"rgb(255,99,132)",
                        backgroundColor:"rgba(255.99.132,0.3)"
                    }
                ]
            });
            setIsLoading(false);
        }
        fetchData()
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

