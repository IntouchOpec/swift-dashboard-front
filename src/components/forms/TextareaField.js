import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const TextareaField = props => {
    const { label, errors, register,name } = props
    return (
        <FormGroup >
            {label && <Label for={`${name}-${label}`}>{label}</Label>}
            <Input name={name} innerRef={register} type='textarea' />
            {errors[name] && <FormFeedback>{errors[name]}</FormFeedback>}
        </FormGroup>
    )
}

export default TextareaField
