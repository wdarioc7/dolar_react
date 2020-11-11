import React from 'react';

const input = (props) => {
    const INPUT_TYPES = [
        'text',
        'email',
        'number',
        'password'
    ]

    let formElement = null;

    if(INPUT_TYPES.lastIndexOf(props.config.type) !== -1){
        formElement = <input 
                        type={props.config.type} 
                        className={['form-control'].join(' ')}
                        onChange={props.change}
                        placeholder={props.config.placeholder}/>
    }

    if(props.config.type === 'select'){

        const options = props.config.options.map((opt) => {
            let key = Object.keys(opt)[0];
            let value = opt[key];
            return <option key={key} value={key} selected={ value===key ? true : false }>{value}</option>
        })

        formElement = <select 
            className={['form-control'].join(' ')}
            onChange={props.change}>
            {options}
        </select>
    }

    if(props.config.type === 'textarea'){
        formElement = <textarea className={['form-control'].join(' ')}
            onChange={props.change} value={props.value}>

        </textarea>
    }

    return (
        <div className="form-group">
            {formElement}
        </div>
    )
}

export default input;