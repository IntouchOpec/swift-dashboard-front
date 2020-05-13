import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const InputField = props => {
    const { name, label, register, error, type, className } = props
    let message
    if (error) {
        message = error.message
    }
    return (
        <FormGroup >
            {label && <Label htmlFor={`${name}-${label}`}>{label}</Label>}
            <Input className={className} type={type} id={`${name}-${label}`} name={name} innerRef={register} invalid={error && true} />
            {message && <FormFeedback>{message}</FormFeedback>}
        </FormGroup>
    )
}

export default InputField