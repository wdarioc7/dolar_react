import React from 'react';
import classes from './Layout.css';
import setIcapLogo from '../../assets/img/dolar-set-fx-nobg.png';
import {Link} from 'react-router-dom';
const layout = (props) => {
    return(
        <div className={props.register ? classes.RegisterContainer : classes.LoginContainer}>
            <Link to="/"><img alt="SET ICAP | FX" src={setIcapLogo} className={classes.Logo}/></Link>
            {props.children}
        </div>
    )
}

export default layout;