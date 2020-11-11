/*eslint no-control-regex: "off", no-invalid-regexp: "off"*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Http, HttpNode, AuthHttp } from "../../axiosInstances";
import CloseImage from '../../assets/img/moneda.png'
import Average from '../../assets/img/moneda.png'
import HomeHeader from "../../components/HomePage/Header/Header";
import DolarPrices from "../../components/HomePage/DolarPrices/DolarPrices";
import DolarAmmounts from "../../components/HomePage/DolarAmounts/DolarAmounts";
import News from "../../components/HomePage/News/News";
import Currencies from "../../components/HomePage/Currencies/Currency";
import BVCStock from "../../components/HomePage/BVCStock/BVCStock";
import StockIndex from '../../components/HomePage/StockIndex/StockIndex';
import DolarSpot from "../shared/DolarSpot/DolarSpot";
import classes from "./HomePage.css";
import Loader from '../../components/Nifty/UI/Loader/Loader';
import clockRewind from '../../assets/img/transaction.png';
import PreFooter from '../../components/shared/PreFooter/PreFooter';
import Footer from "../../components/shared/Footer/Footer";
import client from "../../assets/img/client.png";
import curvas from "../../assets/img/curvas.png";
import transaction from "../../assets/img/transaction.png";

const CURRENCY_REGEX = new RegExp(
  /(?<from>\w{3})\s+\/\s+(?<to>\w{3})\s+(?<value>[\d.]+)\s*(?<change>[\d.+-]+)/
);
const BVC_REGEX = new RegExp(
  /(?<stock>[A-Za-z]+)(?<stock_value>\d*\.*\d{1,3},\d{2})(?<stock_change>\-*\d+\.*\d*)/
);
class HomePage extends Component {
  state = {
    dolarPrices: {},
    dolarAmmounts: {},
    closePrice: 0,
    avgPrice: 0,
    news: [],
    currencies: [],
    bvc: []
  };

  interval = null;

  mapDolarPrices = stats => {
    const dolarPrices = {
      trm: {
        price: stats.trm,
        change: stats.trmPriceChange
      },
      openPrice: {
        price: stats.openPrice,
        change: stats.openPriceChange
      },
      minPrice: {
        price: stats.minPrice,
        change: stats.minPriceChange
      },
      maxPrice: {
        price: stats.maxPrice,
        change: stats.maxPriceChange
      }
    };

    const newState = {
      ...this.state,
      dolarPrices: dolarPrices
    };
    this.setState(newState);
  };

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

  mapNews = news => {
    const newState = {
      ...this.state,
      news: news
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

  mapBVCData = data => {
    const newState = {
      ...this.state,
      bvc: data
    };
    this.setState(newState);
  };

  componentDidMount() {
    this.onMount();
    this.interval = setInterval(this.onMount.bind(this), 1000 * 60 * 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMount() {

    let now = new Date();
    Http.get('/news/rss/').then(response => {
      const news = response.data.map(elem => {
        return {
          ...elem,
          body: elem.body,
          headline: elem.headline,
        }
      });
      this.mapNews(news);
    })

    const month = now.getMonth() < 9 ? `0${(parseInt(now.getMonth()) + 1)}` : parseInt(now.getMonth()) + 1


    HttpNode.post(`seticap/api/estadisticas/estadisticasPromedioCierre/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: 71, // USD for now
      delay: 15
    }).then(response => {
      this.setState({
        ...this.state,
        closePrice: response.data.data.close,
        avgPrice: response.data.data.avg
      })
    });

    HttpNode.post(`seticap/api/estadisticas/estadisticasPrecioMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: 71, //USD for now
      delay: 15
    }).then(response => {
      this.setState({
        ...this.state,
        dolarPrices: {
          trm: { price: response.data.data.trm, change: response.data.data.trmchange },
          openPrice: { price: response.data.data.open, change: response.data.data.openchange },
          minPrice: { price: response.data.data.low , change: response.data.data.lowchange},
          maxPrice: { price: response.data.data.high, change: response.data.data.highchange }
        }
      })
    })

    HttpNode.post(`seticap/api/estadisticas/estadisticasMontoMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: 71, //USD for now.
      delay: 15
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

    AuthHttp.get(
      `seticap/api/bvc/indices/`
    ).then(response => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, "text/html");
      const table = [];
      const rows = doc.getElementsByTagName('table')[0].children[0].children;
      Array.from(rows).forEach(tr => {
        const row = [];
        Array.from(tr.children).forEach((td, index) => {
          if(index == 2){
            row.push(td.children[0].innerHTML)
          }else{
            row.push(td.innerHTML.trim());
          }
        });
        table.push(row);
      })
      
      this.setState({
        ...this.state,
        stockTable: table
      })
    })

    HttpNode.get(
      `seticap/api/bvc/indiceIGBC/`
    ).then(response => {
      this.setState({
        ...this.state,
        stockChart: response.data
      })
    })

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
  }

  render() {
    return (
      <React.Fragment>
        {this.props.auth.logginIn ? <Loader opacity="0.8"></Loader> : null}
        <div id="container" className="home_page">
          <HomeHeader auth={this.props.auth} />
          <div className="boxed">
            <div className={['container-fluid', classes.padd20].join(' ')}>
              <div className={classes.DolarEndDay}>
                <div className="row">
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
                  <div className="col-md-6">
                    <div className="panel media middle pad-all">
                      <div className="media-left">
                        <div className="pad-hor">
                          <img alt="clock" src={clockRewind} style={{ width: '52px' }}></img>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className={["mar-no text-semibold", classes.SubTitle].join(' ')}>
                          Información del dólar con 15 minutos de retraso.
                          <br/>
                        </p>
                        <p className="mar-no" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <DolarSpot delay={0} />
                </div>
                <div className="col-md-3">
                  <div className={["panel", classes.AsideChartPanel].join(' ')}>
                    <h5>Estadísticas de Mercado</h5>
                    <br />
                    <ul className="menu_t">
                      <li>
                        <Link to="/estadisticas/">
                          <div className="icon">
                            <img src={transaction} alt="transaction" />
                          </div>
                          <div className="lk">
                            <span className="tx">Spot</span>
                            <span className="mk">></span>
                          </div>
                        </Link>

                      </li>
                      <li>
                        <Link to="/estadisticas/">
                          <div className="icon">
                            <img src={curvas} alt="curvas" />
                          </div>
                          <div className="lk">
                            <span className="tx">IMCs</span>
                            <span className="mk">></span>
                          </div>
                        </Link>

                      </li>
                      <li>
                        <Link to="/estadisticas/">
                          <div className="icon">
                            <img src={client} alt="client" />
                          </div>
                          <div className="lk">
                            <span className="tx">Clientes</span>
                            <span className="mk">></span>
                          </div>
                        </Link>

                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <iframe
                    title="actions ticker"
                    id="st_e4e0feb0d6e34ce6a093d4059fe3bd6d"
                    frameBorder="0"
                    scrolling="no"
                    width="100%"
                    height="40px"
                    src="https://api.stockdio.com/visualization/financial/charts/v1/Ticker?app-key=395DFC50D7D9415DA5A662933D57E22F&stockExchange=BVC&symbols=ECOPETROL;GRUPOAVAL;BCOLOMBIA;GRUPOSURA;BOGOTA;GRUPOARGOS&culture=Spanish-LatinAmerica&palette=Financial-Light&googleFont=true&onload=st_e4e0feb0d6e34ce6a093d4059fe3bd6d"
                  />
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
                <div className="col-sm-12 col-md-4">
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
                <div className="col-md-4 col-sm-12">
                  <BVCStock stocks={this.state.bvc} />
                </div>
                <div className="col-md-4 col-sm-12">
                  <StockIndex chart={this.state.stockChart} table={this.state.stockTable}></StockIndex>
                </div>
                <div className="col-md-4 col-sm-12">
                  <News news={this.state.news} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  Información con 15 minutos de retraso | * No incluye registros
                    </div>
              </div>
              <PreFooter></PreFooter>
            </div>
            <Footer></Footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(HomePage);
