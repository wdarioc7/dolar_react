import React, { Component } from 'react';
import { Http, HttpNode } from '../../axiosInstances';

const strip_html_tags = (str, rep = "") => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, rep);
}

const HEADERS = ["Merc.", "Moneda", "Plazo", "Monto Acumulado", "Apertura", "Cierre", "No Trans.",
    "Promedio", "Precio mínimo", "Precio máximo", "Monto promedio", "Monto mínimo", "Monto máximo",
    "Monto último", "Fecha"]

const PRICEHEADERS = ["Monto Acumulado", "Apertura", "Cierre", "Promedio", "Precio mínimo",
    "Precio máximo", "Monto promedio", "Monto mínimo", "Monto máximo", "Monto último"]

class StatisticsComponent extends Component {
    state = {
        sectorInfo: [],
        realInfo: []
    }

    mapTable(response) {
        const parser = new DOMParser();
        let parserTable = parser.parseFromString(response.data, "text/html");
        const sectorInfoTitles = Array.from(parserTable.querySelectorAll(".sectores_header > tbody > tr > th")).map(
            cell => strip_html_tags(cell.innerHTML, ' '));

        const sectorInfo = Array.from(parserTable.querySelectorAll('.sectores > tbody > tr')).map(
            row => Array.from(row.querySelectorAll('td')).map(
                cell => strip_html_tags(cell.innerHTML, ' ')
            )
        );
        return {
            titles: sectorInfoTitles,
            info: sectorInfo
        }
    }

    componentDidMount() {
        HttpNode.post('seticap/api/estadisticas/estadisticasMercado', { "moneda": "USD/COP", "sector": 1 }).then(
            response => {
                let info = []
                response.data.result.map(obj => {
                    let row = []
                    HEADERS.map(key => {
                        if (PRICEHEADERS.indexOf(key) != -1) {
                            row.push(new Intl.NumberFormat('es-CO', { style: "currency", currency: "COP" }).format(parseFloat(obj[key]).toFixed(2)));
                        } else {
                            row.push(obj[key]);
                        }
                    })
                    info.push(row);
                })
                this.setState({
                    ...this.state,
                    sectorInfo: info
                })
            }
        )

        HttpNode.post('seticap/api/estadisticas/estadisticasMercado', { "sector": 2 }).then(
            response => {
                let info = []
                response.data.result.map(obj => {
                    let row = []
                    HEADERS.map(key => {
                        if (PRICEHEADERS.indexOf(key) != -1) {
                            row.push(new Intl.NumberFormat('es-CO', { style: "currency", currency: "COP" }).format(parseFloat(obj[key]).toFixed(2)));
                        } else {
                            row.push(obj[key]);
                        }
                    })
                    info.push(row);
                })
                this.setState({
                    ...this.state,
                    realInfo: info
                })
            }
        )

    }

    render() {
        const paddingTop = this.props.paddingTop ? this.props.paddingTop : '0'
        return (
            <div id="content-container" style={{paddingTop: `${paddingTop}%`}}>
                <div id="page-content">
                    <div>
                        <div className="row">
                            <h4><span className="badge badge-warning">IMCs / IMCs</span></h4>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{ backgroundColor: 'white', overflowX: 'scroll' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {HEADERS.map(title => <th key={`icms-${title}`}>{title}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sectorInfo.map((row, i) => <tr key={`srow-${i}`}>{row.map((cell, j) => <td key={`scell-${i}${j}`} >{cell}</td>)}</tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <h4><span className="badge badge-warning">IMCs / Clientes</span></h4>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{ backgroundColor: 'white' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {HEADERS.map(title => <th key={`real-${title}`}>{title}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.realInfo.map((row, i) => <tr key={`rrow-${i}`}>{row.map((cell, j) => <td key={`rcell-${i}${j}`} >{cell}</td>)}</tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatisticsComponent;