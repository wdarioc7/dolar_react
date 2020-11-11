import React from "react";
import classes from "./Header.css";
import logo from "../../../assets/img/dolar-fx-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import epayco from '../../../assets/img/boton_de_cobro_epayco5.png'
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';

import 'moment/locale/es';

const HomeHeader = props => {
  const to = props.auth && props.auth.token === '' ? '/auth/login/' : '/dashboard/';
  const empty = props.empty ? props.empty : false;
  const [hour, setHour] = useState(0);
  const [isSHowingButtons, setShowingButton] = useState(false);

  moment.locale('es');
  useInterval(() => setHour(moment(new Date()).format('MMMM D YYYY, h:mm:ss a')), 1000)
  const toggleHomeMenu = () => {
    setShowingButton((actualShowingButton) => !actualShowingButton);
  }
  return (
    <React.Fragment>
      <div id="content-container" className={['home', classes.HomeRibbon].join(' ')}>
        <div id="row" className="row" style={{paddingTop:'4px'}}>
          <div className="col-md-4">
            <img className={classes.MainLogo} alt="set-fx logo" src={logo} />
            <a onClick={() => toggleHomeMenu()} className={["pull-right", classes.MobileMenu].join(' ')}><FontAwesomeIcon icon={faBars} /></a>
          </div>
          <div className="col-md-8">
          {!empty ? 
              <div className={["buttons-container", classes.ButtonContainer, isSHowingButtons ? classes.ButtonContainerOpen: ''].join(' ')}>
                {props.auth && props.auth.token === '' ?
                  <React.Fragment>
                    <Link to={`/auth/registro/`} className={['btn', 'btn-warning', classes.HeaderButton].join(' ')}>
                      Regístrese y obtenga una Demo
                    </Link> 
                    {/* <div className={classes.Separator}></div>  */}
                    </React.Fragment> : ''}

                <Link to={to} className={['btn', 'btn-success', classes.HeaderButton].join(' ')}>
                  {props.auth && !props.auth.logginIn ?
                    props.auth && props.auth.token === '' ?
                      "Iniciar sesión" :
                      `Bienvenido(a) ${props.auth.user}`
                    : '...'}
                  <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faUser}></FontAwesomeIcon>
                </Link>
                {/* <div className={classes.Separator}></div> */}
                <div className={classes.EpaycoInline}>
                  <span className={classes.EpaycoLabel}>Cancele sus servicios online</span>
                  <div className={['btn', classes.BTNEpayco].join(' ')}>
                    <Link to="/precios/">
                      <img alt="epayco button" src={epayco} />
                    </Link>
                  </div>
                </div>
              </div>
          : null }
          </div>
          {/* <div className="clearfix" /> */}
        </div>
        <div className="row menu_p">
          <ul>
            <li>
              <Link to="/">
                Inicio
              </Link>
            </li>
            <li>
              <a href="https://set-icap.com/set-icap-fx/productos-y-servicios/#setfx">
                Productos y Servicios
              </a>
            </li>
            <li>
              <a href="https://set-icap.com/set-icap-fx/productos-y-servicios/#mc">
                Mercado Cambiario
              </a>
            </li>
            <li>
              <a href="https://set-icap.com/set-icap-fx/acerca-de/">
                SET - FX
              </a>
            </li>
            <li>
              <a href="https://set-icap.com/contacto/">
                Contacto
              </a>
            </li>
            <li className="span"/>
            <li>
              <a href="#">
                {hour ? `${hour.charAt(0).toUpperCase()}${hour.substring(1)}` : null}
              </a>
            </li>
          </ul>            
        </div>            
        
      </div>
    </React.Fragment>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}


export default HomeHeader;
