import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { FormFeedback, FormGroup, Label } from 'reactstrap'
import { Controller } from 'react-hook-form'

export const BaseDatePicker = (props) => {
    const {label, error, name} = props
    let message
    if (error) {
        message = error.message
    }
    return (
    <FormGroup>
        {label && <div><Label for={`${name}-${label}`}>{label}</Label></div>}
        <DatePicker
            autocomplete='off'
            className={`form-control ${message ? 'border border-danger' : ''}`}
            calendarClassName="date-time__calendar"
            dayClassName={() => "date-time__day"}
            popperModifiers={{
                preventOverflow: {
                    enabled: true
                }
            }}
            {...props}
        />
        {message && <div style={{width: '100%',marginTop: '.25rem',fontSize: '80%',color: '#dc3545'}}>{message}</div>}
   </FormGroup>
)}

export const DatePickerField = props => {
    const { name, setValue, register, error, label, rules, value } = props
    const [date, setDate] = useState()

    useEffect(() => {
        register(name)
    }, [])

    const onChange = date => {
        setValue(name, date)
        setDate(date)
    }

    return (
        <Controller
            autoComplete='off'
            onChange={([selected]) => {
                onChange(selected)
                return selected
            }}
            name={name}
            // register={register({ required: true })}
            rules={rules}
            as={
                <BaseDatePicker 
                    name={name}
                    label={label}
                    error={error}
                    selected={date}
                    placeholderText={name}
                    onChange={onChange}
                />
            }
        />
    )
}


// export default BaseDatePicker
