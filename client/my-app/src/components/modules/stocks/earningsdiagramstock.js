import axios from 'axios';
import React, {useEffect, useState} from 'react';
import "../../style/modules/stocks/earningsdiagramstock.css";
import { Bubble } from 'react-chartjs-2';
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function EarningsDiagramStock(props){

    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${props.name}/earnings`,{
                headers: {
                    'X-RapidAPI-Key': '30c2da4a55msh871baf4c2d8a78dp16021cjsn9e4fdc286002',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });
            let earningsArrayActual = [];
            earningsArrayActual.push({x:2022.25 ,y:data.earnings.earningsChart.quarterly[0].actual.raw,r:10 });
            earningsArrayActual.push({x:2022.5 ,y:data.earnings.earningsChart.quarterly[1].actual.raw,r:10 });
            earningsArrayActual.push({x:2022.75 ,y:data.earnings.earningsChart.quarterly[2].actual.raw,r:10 });
            earningsArrayActual.push({x:2022.99 ,y:data.earnings.earningsChart.quarterly[3].actual.raw,r:10 });
            earningsArrayActual.push();

            let earningsArrayEstimate = [];
            earningsArrayEstimate.push({x:2022.25 ,y:data.earnings.earningsChart.quarterly[0].estimate.raw,r:10 });
            earningsArrayEstimate.push({x:2022.50 ,y:data.earnings.earningsChart.quarterly[1].estimate.raw,r:10 });
            earningsArrayEstimate.push({x:2022.75 ,y:data.earnings.earningsChart.quarterly[2].estimate.raw,r:10 });
            earningsArrayEstimate.push({x:2022.99 ,y:data.earnings.earningsChart.quarterly[3].estimate.raw,r:10 });
            earningsArrayEstimate.push({x:2023.25 ,y:data.earnings.earningsChart.currentQuarterEstimate.raw,r:10 });
            earningsArrayEstimate.push();

            console.log(data.earnings.earningsChart);

            setChartData({
                datasets: [
                    {
                        label: 'Actual',
                        data: earningsArrayActual,
                        backgroundColor: 'rgb(85,199,9)',
                    },
                    {
                        label: 'Estimate',
                        data: earningsArrayEstimate,
                        backgroundColor: 'rgba(255,213,0,0.38)',
                    },
                ],
            })
            setIsLoading(false);

        }
        fetchData();
    },[])

    return(
        <div className="main-earning-diagram">
            <p className="title_earnings">Earnings per share</p>
            <div className="chart-earning">{
                isLoading ? <h1>Loading</h1> :<Bubble options={{
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    }}} data={chartData} />}
            </div>

        </div>
    );
}

export default EarningsDiagramStock;