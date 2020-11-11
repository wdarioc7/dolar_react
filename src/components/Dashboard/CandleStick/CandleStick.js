import React, {Component} from 'react';
import Chart from 'chart.js';
import {HttpNode} from '../../../axiosInstances';
require('../../../utils/FinantialChart');

class CandleStick extends Component{
    chart = null;
    state = {
        mobile: false
    }
    render(){
        return(
            <div className="panel-body">
                <div style={{ width: "100%", height: '350px', padding: '0 ' + this.state.mobile ? '0' : '20px' }}>
                    <canvas
                        id="CandleStick"
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
            this.chart.destroy()
        }

        let market = this.props.market ? this.props.market : 71; // default 71
        let period = this.props.period ? this.props.period : '5d'; // default 5 days
        HttpNode.post(`seticap/api/graficos/graficoVelas`, {
            mercado: market, 
            moneda: 'USD/COP', 
            periodo: period,
            bandera: window.innerWidth <= 600 ? 1 : 0
        }).then(
            response => {
                const responsedata = response.data.data.data.data;
                let data = responsedata.datasets[0].data.map((elem, index) => {
                    elem.t = new Date(responsedata.labels[index]).valueOf();
                    return elem
                })
                
                let ctx = document.getElementById("CandleStick").getContext("2d");
                this.chart = new Chart(ctx, {
                    type: 'candlestick',
                    data: {
                        datasets: [{
                            label: 'Convenciones: [Máximo - Mínimo , Apertura - Cierre]',
                            data: data
                        }],
                    },
                    options: {
                        responsive: true,
                        animation: false,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                              ticks: {
                                  maxRotation: 90,
                                  minRotation: 90,
                                  maxTicksLimit: 30
                              }
                          }]
                        }
                      }
                });
            }
        )
    }
}

export default CandleStick;