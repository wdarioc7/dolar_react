import React from 'react';
import classes from './Button.css';

const typeToButtonClass = {
    'primary': classes.btnPrimary,
    'info': classes.btnInfo,
    'success': classes.btnSuccess,
    'warning': classes.btnWarning,
    'danger': classes.btnDanger
}

const button = (props) => {
    const btnType = props.buttonType === undefined ? typeToButtonClass['primary'] : typeToButtonClass[props.type]
    return (
        <button type={props.buttonType} {...props} className={['btn', 'btn-lg', 'btn-block', btnType].join(' ')}>{props.children}</button>
    )

}

export default button;