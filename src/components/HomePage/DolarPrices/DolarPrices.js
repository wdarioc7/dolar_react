import React from "react";
import NiftyTable from "../../Nifty/UI/Table/NiftyTable";
import Row from "../../../components/Nifty/UI/Table/Row/NiftyRow";
import Cell from "../../../components/Nifty/UI/Table/Row/NiftyCell";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from "./DolarPrices.css";
import { faChevronUp, faChevronDown, faDotCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const dolarPrices = props => {
  const prices = props.dolarPrices;
  return (
    <div className={["panel", "panel-primary", classes.DolarPrice].join(" ")}>
      <div className="panel-heading">
        <h3 className="panel-title">Precios del dólar</h3>
      </div>
      <div className={["panel-body", classes.Body].join(" ")}>
        <NiftyTable lineHeight="36px">
          <Row>
            <Cell>
              <span className="text-main text-semibold">TRM</span>
            </Cell>
            <Cell>
              <span className={["text-semibold", getFontClass(prices.trm.change)].join(' ')}>{prices.trm.price} </span>
              <FontAwesomeIcon className={getFontClass(prices.trm.change)} icon={getFontAwesomeIcon(prices.trm.change)} />
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Apertura *</span>
            </Cell>
            <Cell className="text-center">
              <span className={["text-semibold", getFontClass(prices.openPrice.change)].join(' ')}>{prices.openPrice.price} </span>
              <FontAwesomeIcon className={getFontClass(prices.openPrice.change)} icon={getFontAwesomeIcon(prices.openPrice.change)} />
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Mínimo *</span>
            </Cell>
            <Cell className="text-center">
              <span className={["text-semibold", getFontClass(prices.minPrice.change)].join(' ')}>{prices.minPrice.price} </span>
              <FontAwesomeIcon className={getFontClass(prices.minPrice.change)} icon={getFontAwesomeIcon(prices.minPrice.change)} />
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Máximo *</span>
            </Cell>
            <Cell className="text-center">
              <span className={["text-semibold", getFontClass(prices.maxPrice.change)].join(' ')}>{prices.maxPrice.price} </span>
              <FontAwesomeIcon className={getFontClass(prices.maxPrice.change)} icon={getFontAwesomeIcon(prices.maxPrice.change)} />
            </Cell>
          </Row>
        </NiftyTable>
      </div>
    </div>
  );
};

const getFontAwesomeIcon = str => {
  if (str === 'UP') {
    return faChevronUp
  }
  if (str === 'DOWN') {
    return faChevronDown
  }
  if (str === 'SAME') {
    return faDotCircle
  }
  return faMinusCircle
}

const getFontClass = str => {
  if (str === 'UP') {
    return "text-success"
  }
  if (str === 'DOWN') {
    return "text-danger"
  }
  if (str === 'SAME') {
    return "text-primary"
  }
  return "text-primary"
}

export default dolarPrices;
