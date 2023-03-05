import "../../style/modules/stocks/revenuediagram.css";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

function RevenueDiagramStock(props){

    const [diagramData, setDiagramData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [labels, setLabels] = useState();

    useEffect(()=>{

        const fetchData = async () => {
            let dataNetIncome = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${props.name}/cashflow-statement`,{
                headers:{
                    'X-RapidAPI-Key': 'a942a5b67cmshc18c7032bf748c5p10d81ajsn760c27013e41',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });
            let dataRevenue = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${props.name}/earnings`,{
                headers: {
                    'X-RapidAPI-Key': 'a942a5b67cmshc18c7032bf748c5p10d81ajsn760c27013e41',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });

            const labels = ['2019', '2020', '2021', '2022'];
            const revenue = dataRevenue.data.earnings.financialsChart.yearly.map((item)=>item.revenue.raw);
            const netIncome = dataNetIncome.data.cashflowStatementHistory.cashflowStatements.map((item)=>item.netIncome.raw)
            // console.log(revenue);



            setDiagramData({
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenue,
                        backgroundColor: 'rgb(61,108,225)',
                    },
                    {
                        label: 'Net Income',
                        data: netIncome.reverse(),
                        backgroundColor: 'rgba(12,199,0,0.5)',
                    },
                ],
            });
            setIsLoading(false);
        }
        // fetchData();
    },[])



    return(
        <div className="main-revenue">
            <div className="revenue-netincome-diagram">
                <p className="title-revenue-diagram">Income Statement</p>
                {isLoading ? <h1>Loading</h1>: <Chart type='bar' options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            // position: 'top',
                        },
                        title: {
                            display: false,
                        },
                    },
                }} data={diagramData} />}
            </div>

        </div>
    );

}
export default RevenueDiagramStock;