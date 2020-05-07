import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const InputField = props => {
    const { name, label, register, errors, type } = props
    let message
    if (errors[name]) {
        message = errors[name].message
    }
    return (
        <FormGroup >
            {label && <Label htmlFor={`${name}-${label}`}>{label}</Label>}
            <Input type={type} id={`${name}-${label}`} name={name} innerRef={register} invalid={errors[name] && true} {...props} />
            {message && <FormFeedback>{message}</FormFeedback>}
        </FormGroup>
    )
}

export default InputField