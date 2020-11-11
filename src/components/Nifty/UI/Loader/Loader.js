import React from 'react';
import classes from './Loader.css'
const loader = props => {
    return(<div style={{opacity: props.opacity}} className={classes.cover}><div className={classes.lsdFacebook}><div></div><div></div><div></div></div></div>)
}

export default loader;