import React from 'react';
import NiftyCell from './NiftyCell'

const niftyRow = (props) => {
    let clonedChildren = props.children.map((element, index) => {
        if (element.type !== NiftyCell) {
            throw new Error('`NiftyRow` children should be of type `NiftyCell`.');
        }

        if (index === 0) {
            return React.cloneElement(element, { lineHeight: props.lineHeight, key: index });
        }
        return React.cloneElement(element, {key : index});
    });
    
    return (
        <tr>
            {clonedChildren}
        </tr>
    )
}

export default niftyRow;