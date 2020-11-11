import React from 'react';
import bvcLogo from '../../../assets/img/logo-nuevo-bvc-w.png'
import classes from './StockIndex.css'
import Chart from "chart.js";
class StockIndex extends React.Component{
    render(){
        return(
            <div className={['panel', "panel-info"].join(' ')}>
                <div className={["panel-heading"].join(' ')}>
                    <h3 className={["panel-title", classes.Inline].join(' ')}>
                        Índices accionarios
                    </h3>
                    <img src={bvcLogo} className={["pull-right", classes.BVCLogo].join(' ')} alt="bvc-logo"/>
                </div>
                <div className={["panel-body", classes.StockPanelBody].join(' ')}>
                    <table className={["table table-stripped", classes.StockTable].join(' ')}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Valor</th>
                                <th>Valoración %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.table && this.props.table.map((row, index) => (
                                <tr key={`stock-row-${index}`}>
                                    {row.map((cell,jindex) => (
                                        <td key={`stock-row-cell-${index}${jindex}`}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <canvas id="StockIndex" className={classes.StockChart}></canvas>
                </div>
            </div>
        )
    }

    componentDidUpdate(){
        if(this.props.chart){
            const labels = this.props.chart.map(elem => elem[0]);
            const values = this.props.chart.map(elem => elem[1]);
            let ctx = document.getElementById("StockIndex").getContext("2d");
            const config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets:[{
                        data: values,
                        backgroundColor: "rgba(0,0,0,0)",
                        pointRadius: 0,
                        borderColor: "#8bc34a",
                    }]
                },
                options:{
                    responsive: true,
                    animation: false,
                    maintainAspectRatio: true,
                    line: {
                        tension: 0 // disables bezier curves
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: false,
                            },
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90
                            }
                        }]
                    }
                }
            }
            this.chart = new Chart(ctx, config);
        }
    }
}

export default StockIndex;