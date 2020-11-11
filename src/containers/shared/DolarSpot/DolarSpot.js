import React, { Component } from "react";
import classes from "./DolarSpot.css";
import Chart from "chart.js";
import { HttpNode } from "../../../axiosInstances";
import {connect} from 'react-redux';
class DolarSpotChart extends Component {
  state = {
    labels: [],
    dolarValueData: [],
    mountUSD: [],
    loaded: false,
    mobile: false
  };
  chart = null;
  

  getChartData() {
    
    const dataDelay = this.props.dataDelay ? this.props.dataDelay: '15';
    const today = new Date();
    const rt = parseInt(this.props.dataDelay);
    const url = parseInt(this.props.dataDelay) === 0 ? 'seticap/api/graficos/graficoMonedaRT/' : 'seticap/api/graficos/graficoMoneda/';
    HttpNode.post(url, {
      "fecha": `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`,
      "moneda": 1,
      "delay": dataDelay,
      "market": this.props ? this.props.market : 71
    }).then(
      response => {
        if(this.chart !== null){
          this.chart.destroy()
        }
        let data = null;
        if(rt === 0){
          data = response.data.result[0].datos_grafico_moneda_mercado_rt;
        }else{
          data = response.data.result[0].datos_grafico_moneda_mercado;
        }
        
        data = data
                .replace(/'/g, '"')
                .replace(/\d{2}:\d{2}(:\d{2})*/gi, function(x){ return '"'+x+'"' })
                .replace(/data:/g, '"data":')
                .replace(/label:/g, '"label":')
                .replace(/type:/g, '"type":')
                .replace(/labels:/g, '"labels":')
                .replace(/datasets:/g, '"datasets":')
        
        data = JSON.parse("{" + data + "}").data;

        let ctx = document.getElementById("DolarSpotChart");
        if(ctx !== null){
          ctx = ctx.getContext("2d");
          const config = {
            type: "bar",
            data: {
              labels: data.labels,
              datasets: [
                {
                  label: "Precios del cierre",
                  data: data.datasets[0].data,
                  borderColor: "#8bc34a",
                  borderWidth: 4,
                  pointRadius: 0,
                  yAxisID: "y-axis-2",
                  backgroundColor: "rgba(0,0,0,0)",
                  type: "line"
                },{
                  label: "Monto en miles (USD)",
                  data: data.datasets[1].data,
                  backgroundColor: "red",
                  type: "bar",
                  yAxisID: "y-axis-1",
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
                      labelString: 'Montos'
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
                  }, {
                    scaleLabel: {
                      display: true,
                      labelString: 'Precios'
                    },
                    type: "linear",
                    ticks: {
                      beginAtZero: false
                    },
                    position: "right",
                    id: "y-axis-2",
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
                        minRotation: 90
                    }
                }]
              }
            }
          };
          this.chart = new Chart(ctx, config);
        }
        this.setState({
          loaded: true
        })
      }
    )
  }

  componentDidMount() {
    console.log("DidMount");
    if(window.innerWidth <= 600){
      this.setState({mobile: true})
    }
    this.getChartData();
    if (this.props.delay !== undefined) {
      let delay = this.props.delay === 0 ? 1 : this.props.delay;
      
      this.interval = setInterval(this.getChartData.bind(this), delay * 1000 * 15)
    }
  }


  componentDidUpdate(prevProps) {
    
    if (
      (!this.state.loaded &&
      this.state.labels.length &&
      this.state.dolarValueData.length || (this.props.market != prevProps.market))
    ) {
      console.log('didUpdate')
      this.setState({loaded: false})
      
      this.getChartData();
    }
  }

  componentWillUnmount(){
    if(this.chart !== null){
      this.chart.destroy()
    }
  }

  render() {
    return (
      <div className={["panel", classes.DolarSpotPanel].join(' ')}>
        { !this.state.loaded ? 
          <div className={classes.Cover}><div className={classes.LDSFacebook}><div></div><div></div><div></div></div> </div>
          : null}
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.market == 76 ? 'Next day' : 'Dólar Spot'}</h3>
        </div>
        <div style={{ width: "100%", padding: '0 ' + this.state.mobile ? '0' : '20px' }}>
          <canvas
            className={classes.DolarSpotCanvas}
            id="DolarSpotChart"
          />
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DolarSpotChart);
