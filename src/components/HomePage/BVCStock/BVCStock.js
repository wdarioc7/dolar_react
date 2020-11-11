import React from "react";
import classes from './BVCStock.css';
import bvcLogo from '../../../assets/img/logo-nuevo-bvc-w.png'
const BVCStock = props => {
  return (
    <div className={["panel", "panel-info", classes.bvcStocks].join(" ")}>
      <div className="panel-heading">
        <h3 className={['panel-title', classes.Inline].join(' ')}>Bolsa de Valores de Colombia</h3>
        <img src={bvcLogo} className={[classes.BVCLogo, "pull-right"].join(' ')} alt="bvc-logo"/>
      </div>
      <div className={["panel-body", classes.Body].join(' ')}>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Var. %</th>
            </tr>
          </thead>
          <tbody>
            {props.stocks.map(row => (
              <tr key={row[0] + row[1]}>
                <td className="text-bold">
                  {row[0]}
                </td>
                <td>{row[1]}</td>
                <td
                  className={
                    parseFloat(row[2]) > 0 ? "text-success" : "text-danger"
                  }
                >
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BVCStock;
