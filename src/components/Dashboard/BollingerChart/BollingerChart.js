import React, {Component} from 'react';
import {HttpNode} from '../../../axiosInstances';
import Chart from "chart.js";

class BollingerChart extends Component{
    chart = null;
    state = {
      mobile: false
    }
    render(){
        return   (
            <div className="panel-body">
                <div style={{ width: "100%", height: '350px', padding: '0 ' + this.state.mobile ? '0' : '20px' }}>
                    <canvas
                        id="BollingerChart"
                    />
                </div>
            </div>
        )
    }

    componentDidMount(){
      if(window.innerWidth <= 600){
        this.setState({mobile: true})
      }
        this.mountChart();
    }

    componentDidUpdate(prevProps){
        if(prevProps.period !== this.props.period || prevProps.market !== this.props.market){
            this.mountChart();
        }
    }

    mountChart(){
        if(this.chart != null){
            this.chart.destroy();
        }
        let market = this.props.market ? this.props.market : 71; // default 71
        let period = this.props.period ? this.props.period : '5d'; // default 5 days
        let sma = this.state.sma ? this.state.sma : 20;  // default 20
        let desv = this.state.desv ? this.state.desv : 2; // default 2
        HttpNode.post(`seticap/api/graficos/graficoBollinger`, {
                mercado: market, 
                moneda: 'USD/COP', 
                periodo: period,
                sma: sma,
                desv: desv
            }).then(
            response => {
                const responsedata = response.data.data.data.data;  // this is hilarious
                
                const quotedata = responsedata.datasets.length ? responsedata.datasets[0].data : []
                const average_low = responsedata.datasets.length > 1 ? responsedata.datasets[1].data : []
                const average_hight = responsedata.datasets.length > 2 ? responsedata.datasets[2].data : []
                const average_hight_two = responsedata.datasets.length > 2 ? responsedata.datasets[3].data : []
                
                const average_low_label = responsedata.datasets.length > 1 ? responsedata.datasets[1].label : '';
                const average_hight_label = responsedata.datasets.length > 2 ? responsedata.datasets[2].label : '';
                const average_hight_label_two = responsedata.datasets.length > 2 ? responsedata.datasets[3].label : '';

                const labels = responsedata.datasets.length ? responsedata.labels : []

                let ctx = document.getElementById("BollingerChart").getContext("2d");

                const config = {
                    type: "bar",
                    data: {
                      labels: labels,
                      datasets: [
                        {
                          label: "Cotización USD/COP",
                          data: quotedata,
                          borderColor: "#8bc34a",
                          borderWidth: 1,
                          pointRadius: 0,
                          yAxisID: "y-axis-1",
                          backgroundColor: "rgba(0,0,0,0)",
                          type: "line"
                        },{
                          label: average_low_label,
                          data: average_low,
                          borderColor: "#0077AC",
                          borderWidth: 1,
                          pointRadius: 0,
                          yAxisID: "y-axis-1",
                          backgroundColor: "rgba(0,0,0,0)",
                          type: "line"
                        },{
                            label: average_hight_label,
                            data: average_hight,
                            borderColor: "#C82B2B",
                            borderWidth: 1,
                            pointRadius: 0,
                            yAxisID: "y-axis-1",
                            backgroundColor: "rgba(0,0,0,0)",
                            type: "line"
                        },{
                          label: average_hight_label_two,
                            data: average_hight_two,
                            borderColor: "#000000",
                            borderWidth: 1,
                            pointRadius: 0,
                            yAxisID: "y-axis-1",
                            backgroundColor: "rgba(0,0,0,0)",
                            type: "line"
                        }
                      ]
                    },
                    options: {
                      responsive: true,
                      animation: false,
                      maintainAspectRatio: false,
                      line: {
                        tension: 0 // disables bezier curves
                      },
                      scales: {
                        yAxes: [
                          {
                            scaleLabel: {
                              display: true,
                              labelString: 'Precios'
                            },
                            type: "linear",
                            ticks: {
                              beginAtZero: false
                            },
                            position: "left",
                            id: "y-axis-1",
                            gridLines: {
                              display: false
                            }
                          }],
                          xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Horas'
                            },
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90,
                                maxTicksLimit: 30
                            }
                        }]
                      }
                    }
                  };
                
                this.chart = new Chart(ctx, config);
            }
        )
    }
}

export default BollingerChart;