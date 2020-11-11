import React from 'react';
import { isNull } from 'util';

const niftyCell = (props) => {
    const classes = [];
    const lineHeight = isNull(props.lineHeight) ? '' : props.lineHeight;

    if(props.center){
        classes.push("text-center")
    }
    
    return(
        <td className={classes.join(' ')} style={{lineHeight: lineHeight}}>{props.children}</td>
    )
}

export default niftyCell;