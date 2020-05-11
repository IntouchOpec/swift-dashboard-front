import React from 'react'
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

const SelectField = props => {
    let message
    const {options, name, className, label, errors} = props
    if (errors) {
        if (errors[name]) {
            message = errors[name].message
        }
    }
    
    return (
        <FormGroup className='p-0 m-0'>
            {label && <div><Label for={`${name}-${label}`}>{label}</Label></div>}   
            <Input className={className} invalid={message && true} type='select' name={name} id={name} {...props} invalid={message && true}>
                <option disabled>{name}</option>
                <option></option>
                {options.map((i) => 
                    <option key={`${i.id}_${i.name}`} value={i.id}>{i.name}</option>
                )}
            </Input>
            {message && <FormFeedback>{message}</FormFeedback>}
      </FormGroup>
    )
}

export default SelectField