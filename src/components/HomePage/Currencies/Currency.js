import React from "react";

const currencies = props => {
  return (
    <div className="panel panel-primary" style={{paddingBottom: '3px'}}>
      <div className="panel-heading">
        <h3 className="panel-title">Monedas</h3>
      </div>
        <table className="table">
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Valor</th>
              <th>Cambio</th>
            </tr>
          </thead>
          <tbody>
            {props.currencies.map(row => (
              <tr key={row[0]+row[1]}>
                <td className="text-bold">
                  {row[0]} / {row[1]}
                </td>
                <td>{row[2]}</td>
                <td className={parseFloat(row[3]) > 0 ? 'text-success' : 'text-danger' } >{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default currencies;
