import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const CheckboxField = ({ text, className }) => {
    return (
        <FormGroup className={className} check>
            <Label check>
                <Input type='checkbox' />{' '}
                {text}
            </Label>
        </FormGroup>
    )
}

export default CheckboxField
