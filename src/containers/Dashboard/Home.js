import React, { Component } from "react";
import { Http, HttpNode } from "../../axiosInstances";
import DolarPrices from "../../components/HomePage/DolarPrices/DolarPrices";
import DolarAmmounts from "../../components/HomePage/DolarAmounts/DolarAmounts";
import CloseImage from '../../assets/img/moneda.png'
import Average from '../../assets/img/moneda.png';
import clockRewind from '../../assets/img/rewind-time.png';
import DolarSpot from '../shared/DolarSpot/DolarSpot';
import Currencies from "../../components/HomePage/Currencies/Currency";
import News from "../../components/HomePage/News/News";
import Footer from "../../components/shared/Footer/Footer";
import PreFooter from '../../components/shared/PreFooter/PreFooter';
import ChartSwitcher from '../../components/Dashboard/ChartSwitcher/ChartSwitcher';
import classes from './Home.css';

const CURRENCY_REGEX = new RegExp(
  /(?<from>\w{3})\s+\/\s+(?<to>\w{3})\s+(?<value>[\d.]+)\s*(?<change>[\d.+-]+)/
);
const BVC_REGEX = new RegExp(
  /(?<stock>[A-Za-z]+)(?<stock_value>\d*\.*\d{1,3},\d{2})(?<stock_change>-*\d+\.*\d*)/
);

class DashboardHome extends Component {
  state = {
    largeMenu: true,
    market: 'spot',
    dolarPrices: {},
    dolarAmmounts: {},
    currencies: [],
    bvc: [],
    news: [],
    mobile: false
  };

  interval = null;

  MARKET_MAP = {
    'spot': 71,
    'nextday': 76
  }

  mapAmmountPrices = stats => {
    const ammountPrices = {
      totalAmmount: stats.totalAmmount,
      latestAmmount: stats.latestAmmount,
      avgAmmount: stats.avgAmmount,
      minAmmount: stats.minAmmount,
      maxAmmount: stats.maxAmmount,
      transactions: stats.transactions
    };
    const newState = {
      ...this.state,
      dolarAmmounts: ammountPrices
    };
    this.setState(newState);
  };

  mapCurrencyData = data => {
    const newState = {
      ...this.state,
      currencies: data
    };
    this.setState(newState);
  };

  mapNews = news => {
    const newState = {
      ...this.state,
      news: news
    };
    this.setState(newState);
  };

  mapBVCData = data => {
    const newState = {
      ...this.state,
      bvc: data
    };
    this.setState(newState);
  };

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.setState({ mobile: true })
    }
    this.interval = setInterval(this.onMount.bind(this), 1000 * 15);
    this.onMount();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.market !== this.props.match.params.market) {
      clearInterval(this.interval);
      this.onMount();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMount() {
    console.log('refreshinng');
    console.log('Refreshing data at ' + new Date());
    let now = new Date();
    const month = now.getMonth() < 9 ? `0${(parseInt(now.getMonth()) + 1)}` : parseInt(now.getMonth()) + 1

    HttpNode.post(`seticap/api/estadisticas/estadisticasPromedioCierre/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.props.match.params.market], // USD for now
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        closePrice: response.data.data.close,
        avgPrice: response.data.data.avg
      })
    });

    HttpNode.post(`seticap/api/estadisticas/estadisticasPrecioMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.props.match.params.market], //USD for now
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        dolarPrices: {
          trm: { price: response.data.data.trm, change: response.data.data.trmchange },
          openPrice: { price: response.data.data.open, change: response.data.data.openchange },
          minPrice: { price: response.data.data.low, change: response.data.data.lowchange },
          maxPrice: { price: response.data.data.high, change: response.data.data.highchange }
        }
      })
    })

    HttpNode.post(`seticap/api/estadisticas/estadisticasMontoMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.props.match.params.market], //USD for now.
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        dolarAmmounts: {
          totalAmmount: response.data.data.sum,
          latestAmmount: response.data.data.close,
          avgAmmount: response.data.data.avg,
          minAmmount: response.data.data.low,
          maxAmmount: response.data.data.high,
          transactions: response.data.data.count
        }
      })
    })

    Http.get('/news/rss/').then(response => {
      const news = response.data.map(elem => {
        return {
          ...elem,
          body: elem.body,
          headline: elem.headline,
          id: elem.id
        }
      });
      this.mapNews(news);
    });

    HttpNode.get("seticap/api/cma/monedas/").then(response => {
      const parser = new DOMParser();
      let parserTable = parser.parseFromString(response.data, "text/html");
      const CurrencyData = Array.from(parserTable.getElementsByTagName("tr"))
        .map(tr => {
          if (CURRENCY_REGEX.test(tr.innerText)) {
            const results = CURRENCY_REGEX.exec(tr.innerText);
            return results.slice(1);
          }
          return null;
        })
        .filter(Boolean);
      this.mapCurrencyData(CurrencyData);
    });

    HttpNode.get("seticap/api/bvc/acciones/").then(response => {
      const parser = new DOMParser();
      let parserTable = parser.parseFromString(response.data, "text/html");
      const CurrencyData = Array.from(parserTable.getElementsByTagName("tr"))
        .map(tr => {
          if (BVC_REGEX.test(tr.innerText)) {
            const results = BVC_REGEX.exec(tr.innerText);
            return results.slice(1);
          }
          return null;
        })
        .filter(Boolean);
      this.mapBVCData(CurrencyData);
    });

    HttpNode.get(
      `seticap/api/bvc/indices/`
    ).then(response => {
      this.setState({
        ...this.state,
        stockTable: response.data.table
      })
    });
  }

  render() {
    const market = this.MARKET_MAP[this.props.match.params.market];
    return (
      <div id="content-container">

        <div id="page-content">
          <div className={classes.FirstRow}>
            <div className="row">
              <div className="col-md-6">
                <div className="panel media middle pad-all">
                  <div className="media-left">
                    <div className="pad-hor">
                      <img alt="clock" src={clockRewind} style={{ width: '52px' }}></img>
                    </div>
                  </div>
                  <div className="media-body">
                    <p className="mar-no text-semibold" style={{ fontSize: '1.4em', position: 'absolute', top: '25%' }}>
                      Información del dólar en tiempo real.
                    </p>
                    <p className="mar-no" />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-primary panel-colorful media middle pad-all">
                  <div className="media-left">
                    <div className="pad-hor">
                      <img style={{ width: '52px' }} src={CloseImage} alt="Cierre"></img>
                    </div>
                  </div>
                  <div className="media-body">
                    <p className="text-2x mar-no text-semibold">
                      {this.state.closePrice}
                    </p>
                    <p className={["mar-no font-weight-bold", classes.Label].join(' ')}>Cierre</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="panel panel-primary panel-colorful media middle pad-all">
                  <div className="media-left">
                    <div className="pad-hor">
                      <img style={{ width: '52px' }} src={Average} alt="Promedio"></img>
                    </div>
                  </div>
                  <div className="media-body">
                    <p className="text-2x mar-no text-semibold">
                      {this.state.avgPrice}
                    </p>
                    <p className={["mar-no font-weight-bold", classes.Label].join(' ')}>Promedio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div id="demo-panel-network" className="panel">
                <div className="pad-all">
                  <div className={this.state.mobile ? '' : "container-fluid"}>
                    <DolarSpot key="spot" market={market} dataDelay={0} delay={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              {Object.keys(this.state.dolarPrices).length ? (
                <DolarPrices dolarPrices={this.state.dolarPrices} />
              ) : (
                  ""
                )}
            </div>
            <div className="col-md-4 col-sm-12">
              {Object.keys(this.state.dolarAmmounts).length ? (
                <DolarAmmounts dolarAmmounts={this.state.dolarAmmounts} />
              ) : (
                  ""
                )}
            </div>
            <div className="col-md-5">
              <Currencies currencies={this.state.currencies} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <ChartSwitcher />
            </div>
            <div className="col-md-3">
              <News news={this.state.news} dashboard={true} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              Información con 1 minuto de retraso | * No incluye registros
              </div>
          </div>
        </div>
        <PreFooter></PreFooter>
        <Footer></Footer>
      </div>
    );
  }

  changeMarket = (market) => {
    this.setState({ market: market })
  }
}

export default DashboardHome;
