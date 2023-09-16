import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
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
        <Form.Group controlId={props.name}>
            <Form.Label> {props.required ? '*': ''} {props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder ? props.placeholder : props.label}
                name={props.name}
                value={props.value}
                onChange={handleInputChange}
                className={isValid ? '': 'invalid'}
            />
        </Form.Group>
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
  
