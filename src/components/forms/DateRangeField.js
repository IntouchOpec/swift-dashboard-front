import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'

const BaseDatePicker = (props) => {
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
            calendarClassName='date-time__calendar'
            dayClassName={() => 'date-time__day'}
            popperModifiers={{
                preventOverflow: {
                    enabled: true
                }
            }}
            dateFormat="MMM-dd-yyyy"
            // dateFormat="MMM-DD-yyyy"
            {...props}
        />
        {message && <div style={{width: '100%',marginTop: '.25rem',fontSize: '80%',color: '#dc3545'}}>{message}</div>}
   </FormGroup>
)}


const DateRange = props => {
    // const { setError, clearError } = useFormContext()
    const { setValue, errors, defualtValues, DATE_RANGE_KEY, setError, clearError } = props
    let startDateInit
    let endDateInit
    if (defualtValues.start) {
        startDateInit = new Date(defualtValues.start)
    }
    if (defualtValues.end) {
        endDateInit = new Date(defualtValues.end)
    }
    const [startDate, setLocalStartDate] = useState(startDateInit)
    const [endDate, setLocalEndDate] = useState(endDateInit)

    useEffect(() => {
        console.log((startDate && endDate) || (!startDate && !endDate) && true)
        // if ((startDate && endDate) || (!startDate && !endDate)) {
        //     clearError(props.start.key, props.end.key)
        // } else if (startDate && !endDate) {
        //     setError(props.end.key, 'required', `${props.end.name} is required!`)
        // } else if (!startDate && endDate) {
        //     setError(props.start.key, 'required', `${props.start.name} is required!`)
        // }
    }, [startDate, endDate, errors])

    const onSetStart = date => {
        setLocalStartDate(date)
        setValue(props.start.name, date, true)
    }

    const onSetEnd = date => {
        setLocalEndDate(date)
        setValue(props.end.name, date, true)
    }
    const { start, end, col, register } = props

    useEffect(() => {
        register(props.start.key)
        register(props.end.key)
    }, [])
    
    return (
        <>
            <div className={`col-${col}`}>
                <BaseDatePicker
                    name={start.name}
                    label={start.label}
                    selected={startDate}
                    errors={errors}
                    selectsStart
                    placeholderText={`Select ${start.label}`}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onSetStart}
                />
            </div>
            <div className={`col-${col}`}>
                <BaseDatePicker
                    name={end.name}
                    label={end.label}
                    errors={errors}
                    selected={endDate}
                    selectsEnd
                    placeholderText={`Select ${end.label}`}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onSetEnd}
                    minDate={startDate}
                />
            </div>
        </>
    )
}

export default DateRange