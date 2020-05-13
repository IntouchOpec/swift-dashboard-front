import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const TextareaField = props => {
    const { label, error, register, name } = props
    let message
    if (error) {
        message = error.message
    }
    return (
        <FormGroup >
            {label && <Label htmlFor={`${name}-${label}`}>{label}</Label>}
            <Input name={name} innerRef={register} type='textarea' />
            {message && <FormFeedback>{message}</FormFeedback>}
        </FormGroup>
    )
}

export default TextareaField
