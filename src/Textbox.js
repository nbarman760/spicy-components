import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';

import './style.css';

const Textbox = (props)=> {
    const [isValid, setIsValid]= useState(true);
    const handleInputChange =(e)=>{
            if(props.required){
                if(e.target.value == ''){
                    setIsValid(false);
                }else{
                    setIsValid(true);
                }
            }
            props.onChange(e); 
    }
    return (
        <>
            <div className="textbox__container" id={props.name}>
                <input
                    type="text"
                    className="outline-text-input"
                    placeholder={props.label}
                    name={props.name}
                    value={props.value}
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <label className="placeholder-label">{props.label}</label>
            </div>
        </>
    )
}

Textbox.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
};

export default Textbox;
  
