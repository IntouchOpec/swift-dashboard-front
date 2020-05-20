import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import SelectReact from 'components/forms/SelectReact'
import DateRange from 'components/forms/DateRangeField'
import { Button, FormGroup, Label } from 'reactstrap'
import InputField from 'components/forms/InputField'
import { XSquareFill } from 'react-bootstrap-icons'

const TimeSheetForm = props => {
    const { submitForm, users, defaultValues, jobs } = props
    const [timeSheets, setTimeSheets] = useState([0])
    const [counter, setCounter] = useState(1)
    const methods = useForm()
    const { register, unregister, handleSubmit, setValue, errors, setError } = methods

    const removeTimeSheets = index => {
        setTimeSheets(prevIndexes => [...prevIndexes.filter(item => item !== index)])
        const fieldTimeSheets = `[timeSheets${index}]`
        unregister(`${fieldTimeSheets}.`)
    }

    const addTimeSheet = () => {
        setTimeSheets(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => prevCounter + 1)
    }

    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(submitForm)}>
                {timeSheets.map((timeSheet, index) => {
                    const fieldTimeSheets = `[timeSheets${index}]`
                    let errorTimeSheets = {}
                    if (!!errors.timeSheets) {
                        if (errors.timeSheets[index]) {
                            Object.keys(errors.timeSheets[index]).forEach(key => {
                                errorTimeSheets[`${fieldTimeSheets}.${key}`] = errors.timeSheets[index][key]
                            })
                        }
                    }
                    return (
                        <div className='row' key={fieldTimeSheets}>
                            <div className='col-3 mx-2 align-items-end'>
                                <SelectField
                                    setValue={setValue}
                                    name={`${fieldTimeSheets}.user`}
                                    label='user'
                                    options={users}
                                    placeholder=''
                                />
                            </div>
                            <DateRange
                                col='2'
                                defaultValues={defaultValues}
                                setValue={setValue}
                                register={register}
                                errors={errors}
                                setError={setError}
                                defualtValues={{ start: defaultValues['start_date'], end: defaultValues['completion_date'] }}
                                start={{ label: 'start date', name: `${fieldTimeSheets}.start_date`, key: `${fieldTimeSheets}.start_date` }}
                                end={{ label: 'end date', name: `${fieldTimeSheets}.end_date`, key: `${fieldTimeSheets}.end_date` }}
                            />
                            <div className='col-2'>
                                <Select
                                    isClearable
                                    name={`${fieldTimeSheets}.job`}
                                    label='job'
                                    setValue={setValue}
                                    options={jobs}
                                    placeholder=''
                                    error={errorTimeSheets[`${fieldTimeSheets}.day`]}
                                />
                                {/* <FormGroup>
                                    <div><Label for={`user-user`}>job</Label></div>
                                    <SelectReact
                                        isClearable
                                        name={`${fieldTimeSheets}.job`}
                                        options={jobs}
                                        setValue={setValue}
                                        errors={fieldTimeSheets}
                                        register={register}
                                        onChange={() => { }}
                                        value={{}}
                                        placeholder=''
                                    />
                                    {errorTimeSheets[`${fieldTimeSheets}.job`] && <div style={{ width: '100%', marginTop: '.25rem', fontSize: '80%', color: '#dc3545' }}>{errorTimeSheets[`${fieldTimeSheets}.job`].message}</div>}
                                </FormGroup> */}
                            </div>
                            <div className='col-2 mx-2 align-items-end'>
                                <InputField type='text' label='Day' name={`${fieldTimeSheets}.day`} error={errorTimeSheets[`${fieldTimeSheets}.day`]} register={register({  })} />
                            </div>
                            {/* <div className='col-1 align-self-center'> */}
                            <Button color='danger' style={{ marginTop: '2em' }} className='h-100' onClick={() => removeTimeSheets(timeSheet)}>x</Button>
                            {/* </div> */}
                        </div>
                    )
                })}
                <Button onClick={addTimeSheet} color='secondary' className='m-2 text-center rounded-0 btn'>Add TimeSheet</Button>
                <div>
                    <Button onClick={submitForm}  color='warning' className='m-2 text-center rounded-0 btn'>Submit</Button>
                </div>
            </form>
        </FormContext>)
}


const Select = props => {
    const [data, setData] = useState()
    const { name, label, options, setValue, placeholder, error } = props
    let message

    if (error) {
        message = error.message
    }

    const onChange = item => {
        setData(item)
        setValue(name, item)
        return
    }
    return (
        <FormGroup>
            <div><Label for={`${label}-${name}`}>{label}</Label></div>
            <SelectReact
                isClearable
                name={name}
                options={options}
                onChange={onChange}
                value={data}
                placeholder={placeholder}
            />
            {message && <div style={{ width: '100%', marginTop: '.25rem', fontSize: '80%', color: '#dc3545' }}>{message}</div>}
        </FormGroup>
    )
}
const SelectField = props => {
    const [data, setData] = useState()
    const { error, name, label, options, setValue, placeholder } = props
    let message

    if (error) {
        message = error.message
    }

    const onChange = item => {
        setData(item)
        setValue(name, item)
        return
    }

    const removeData = item => {
        setValue(name, '')
        setData()
    }

    return (
        <>
            {data ?
                <div className='d-flex mt-3'>
                    <div className='avatar dropdown-toggle btn btn-secondary'>
                        <span className='text-uppercase'>{`${data.last_name[0]}${data.first_name[0]}`}</span>
                    </div>
                    <div className='m-3'>{data.full_name}</div>
                    <div className='m-3'>{data.position}</div>
                    <div onClick={removeData} className='m-3'><XSquareFill /></div>
                </div>
                :
                <FormGroup>
                    <div>
                        <Label for={`${name}-${label}`}>
                            {label}
                        </Label>
                    </div>
                    <SelectReact
                        isClearable
                        name={name}
                        options={options}
                        onChange={onChange}
                        value={data}
                        placeholder={placeholder}
                    />
                    {message && <div style={{ width: '100%', marginTop: '.25rem', fontSize: '80%', color: '#dc3545' }}>{message}</div>}
                </FormGroup>
            }

        </>
    )
}

export default TimeSheetForm