import React, {Component} from 'react';
import AverageChart from '../AverageChart/AverageChart';
import BollingerChart from '../BollingerChart/BollingerChart';
import PriceChart from '../PriceChart/PriceChart';
import CandleStick from '../CandleStick/CandleStick';
class ChartSwitcher extends Component {
    state = {
        days: '1d',
        chart: 'candlestick'
    }
    render(){
        return(<React.Fragment>
            <div className={['panel', "panel-info",].join(' ')}>
            <div className={["panel-heading"].join(' ')}>
                <h3 className={["panel-title"].join(' ')}>
                    Precios
                </h3>
            </div>
                <div className="btn-group btn-sm" role="group">
                    <button type="button" onClick={this.changeChart('prices')} className={["btn", "btn-primary", "btn-sm", this.state.chart==='prices'? 'active': ''].join(' ')}>Precios</button>
                    <button type="button" onClick={this.changeChart('average')} className={["btn", "btn-primary", "btn-sm", this.state.chart==='average'? 'active': ''].join(' ')}>Promedio</button>
                    <button type="button" onClick={this.changeChart('candlestick')} className={["btn", "btn-primary", "btn-sm", this.state.chart==='candlestick'? 'active': ''].join(' ')}>Velas</button>
                    <button type="button" onClick={this.changeChart('bollinger')} className={["btn", "btn-primary", "btn-sm", this.state.chart==='bollinger'? 'active': ''].join(' ')}>Bollinger</button>
                </div>
            
            { this.state.chart === 'average' ? <AverageChart period={this.state.days} /> : null }
            { this.state.chart === 'prices' ? <PriceChart period={this.state.days} /> : null }
            { this.state.chart === 'bollinger' ? <BollingerChart period={this.state.days} /> : null }
            { this.state.chart === 'candlestick' ? <CandleStick period={this.state.days} /> : null }

                <div className="btn-group btn-sm float-right" role="group">
                    <button onClick={this.changeDays('1d')} className={["btn", "btn-primary", "btn-sm", this.state.days==='1d'? 'active': ''].join(' ')}>1d</button>
                    <button onClick={this.changeDays('5d')} className={["btn", "btn-primary", "btn-sm", this.state.days==='5d'? 'active': ''].join(' ')}>5d</button>
                    <button onClick={this.changeDays('1m')} className={["btn", "btn-primary", "btn-sm", this.state.days==='1m'? 'active': ''].join(' ')}>1m</button>
                    <button onClick={this.changeDays('6m')} className={["btn", "btn-primary", "btn-sm", this.state.days==='6m'? 'active': ''].join(' ')}>6m</button>
                    <button onClick={this.changeDays('1a')} className={["btn", "btn-primary", "btn-sm", this.state.days==='1a'? 'active': ''].join(' ')}>1a</button>
                </div>
                <div className="clearfix"></div>
            </div>
        </React.Fragment>)
    }

    changeChart(chart){
        const changer = () => {
            this.setState({
                ...this.state,
                chart: chart
            })
        }
        return changer
    }

    changeDays(days){
        const changer = () => {
            this.setState({
                ...this.state,
                days: days
            })
        }
        return changer;
    }
}

export default ChartSwitcher;