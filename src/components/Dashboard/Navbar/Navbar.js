import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDollarSign, faCalendarAlt, faTable} from '@fortawesome/free-solid-svg-icons';
import classes from './Navbar.css';
import { Link } from "react-router-dom";

const navbar = props => {
  return (
    <div className="boxed">
      <nav id="mainnav-container">
        <div id="mainnav">
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content" tabIndex="0">
                <ul id="mainnav-menu" className="list-group">
                  <li className={["list-header", classes.MarketTitle].join(' ')}>Mercado</li>
                  <li className={props.market === 'spot' ? 'active-sub' : ''}>
                    <Link to="/dashboard/spot/">
                      <FontAwesomeIcon icon={faDollarSign} style={{fontSize: '1.4em', marginRight: "5px"}}/>
                      <span className="menu-title"> Spot USD/COP</span>
                    </Link>
                  </li>
                  <li className={props.market === 'nextday' ? 'active-sub' : ''}>
                    <Link to="/dashboard/nextday/">
                      <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize: '1.4em', marginRight: "5px"}}/>
                      <span className="menu-title"> Next day USD/COP</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/estadisticas/">
                    <FontAwesomeIcon icon={faTable} style={{fontSize: '1.4em', marginRight: "5px"}}/>
                      <span className="menu-title">Estadisticas</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
