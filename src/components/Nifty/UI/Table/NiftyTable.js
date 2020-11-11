import React from 'react';
import { isNull } from 'util';
import classes from './NiftyTable.css';
import Row from './Row/NiftyRow';

const niftyTable = (props) => {
    const tableClasses = ["table", "table-vcenter", classes.NiftyTable]
    const lineHeight = isNull(props.lineHeight) ? '' : props.lineHeight;

    if(props.hover){
        tableClasses.push("table-hover");
    }
    
    let children = null;
    if(props.children instanceof Array){
        children = props.children;
    }else{
        children = [props.children];
    }

    const clonedRows = children.map((element, index) => {
        if (element.type === Row) {
            return React.cloneElement(element, { lineHeight: lineHeight, key: index });
        }
        return null;
    });

    return (
        <table className={tableClasses.join(" ")}>
            <tbody>
                {clonedRows}
            </tbody>
        </table>
    )
}

export default niftyTable;