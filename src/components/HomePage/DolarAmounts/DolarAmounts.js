import React from 'react';
import NiftyTable from '../../Nifty/UI/Table/NiftyTable';
import Row from '../../Nifty/UI/Table/Row/NiftyRow';
import Cell from '../../Nifty/UI/Table/Row/NiftyCell';
import classes from './DolarAmounts.css';

const dolarAmmounts = (props) => {
    
    return (
        <div className={["panel", "panel-primary", classes.DolarAmounts].join(' ')} style={{paddingBottom: '2px'}}>
            <div className="panel-heading">
                <h3 className="panel-title">Montos USD</h3>
            </div>
            <div className={["panel-body", classes.Body].join(" ")}>
            <NiftyTable lineHeight="18px">
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Negociado</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.totalAmmount}</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Último *</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.latestAmmount}</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Promedio</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.avgAmmount}</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Mínimo</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.minAmmount}</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Máximo</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.maxAmmount}</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span className="text-main text-semibold">Transacciones</span>
                        </Cell>
                        <Cell className="text-center"><span className="text-primary text-semibold">{props.dolarAmmounts.transactions}</span></Cell>
                    </Row>
            </NiftyTable>
            </div>
        </div>
    )
}

export default dolarAmmounts;