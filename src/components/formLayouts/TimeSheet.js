import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import SelectReact from 'components/forms/SelectReact'
import DateRange from 'components/forms/DateRangeField'
import { Button, FormGroup, Label } from 'reactstrap'
import InputField from 'components/forms/InputField'
import { XSquareFill } from 'react-bootstrap-icons'

const TimeSheetForm = props => {
    const { submitForm, users, defaultValues, jobs, jobTypes } = props
    const [userList, setuserList] = useState([0])
    const [counter, setCounter] = useState(1)
    const methods = useForm()
    const { register, unregister, handleSubmit, setValue, errors, setError } = methods

    const removeUser = index => {
        setuserList(prevIndexes => [...prevIndexes.filter(item => item !== index)])
        const fielduserList = `[userList${index}]`
        unregister(`${fielduserList}.`)
    }

    const addUser = () => {
        setuserList(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => prevCounter + 1)
    }

    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(submitForm)}>
                {userList.map((timeSheet, index) => {
                    const fielduserList = `[userList${index}]`
                    let erroruserList = {}
                    if (!!errors.userList) {
                        if (errors.userList[index]) {
                            Object.keys(errors.userList[index]).forEach(key => {
                                erroruserList[`${fielduserList}.${key}`] = errors.userList[index][key]
                            })
                        }
                    }
                    return (
                        <>
                            <div className='row' key={fielduserList}>
                                <div className='col-6 mx-2 align-items-end'>
                                    <SelectField
                                        setValue={setValue}
                                        name={`${fielduserList}.user`}
                                        label='user'
                                        options={users}
                                        placeholder=''
                                    />
                                </div>
                                <Button color='danger' style={{ marginTop: '2em' }} className='rounded-0 h-100' onClick={() => removeUser(timeSheet)}>x</Button>
                            </div>
                            <TimeSheetDetail
                                defaultValues={defaultValues}
                                fielduserList={fielduserList}
                                setValue={setValue}
                                register={register}
                                jobTypes={jobTypes}
                                jobs={jobs}
                                errors={errors}
                                setError={setError}
                                erroruserList={erroruserList} />
                            {/* {<div className='row align-items-end'>
                                <DateRange
                                    col='2'
                                    defaultValues={defaultValues}
                                    setValue={setValue}
                                    register={register}
                                    errors={errors}
                                    setError={setError}
                                    defualtValues={{ start: defaultValues['start_date'], end: defaultValues['completion_date'] }}
                                    start={{ label: 'start date', name: `${fielduserList}.start_date`, key: `${fielduserList}.start_date` }}
                                    end={{ label: 'end date', name: `${fielduserList}.end_date`, key: `${fielduserList}.end_date` }}
                                />
                                <div className='col-2'>
                                    <Select
                                        isClearable
                                        name={`${fielduserList}.job`}
                                        label='job types'
                                        setValue={setValue}
                                        options={jobTypes}
                                        placeholder=''
                                        error={erroruserList[`${fielduserList}.day`]}
                                    />
                                </div>
                                <div className='col-2'>
                                    <Select
                                        isClearable
                                        name={`${fielduserList}.job`}
                                        label='job'
                                        setValue={setValue}
                                        options={jobs}
                                        placeholder=''
                                        error={erroruserList[`${fielduserList}.day`]}
                                    />
                                </div>
                                <div className='col-2 mx-2 align-items-end'>
                                    <InputField type='text' label='Day' name={`${fielduserList}.day`} error={erroruserList[`${fielduserList}.day`]} register={register({})} />
                                </div>
                                <Button color='danger' style={{ marginTop: '2em' }} className='rounded-0 h-100' onClick={() => removeUser(timeSheet)}>x</Button>
                            </div>} */}
                            <Button color='secondary' style={{ marginTop: '2em' }} className='rounded-0 h-100' onClick={() => addUser(index)}>Add User</Button>
                        </>
                    )
                })}
                <div>
                    <Button onClick={submitForm} color='warning' className='m-2 text-center rounded-0 btn'>Submit</Button>
                </div>
            </form>
        </FormContext>)
}


const TimeSheetDetail = props => {
    const [timeSheets, setTimeSheet] = useState([0])
    const [counter, setCounter] = useState(1)

    const addTimeSheet = index => {
        setTimeSheet(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => prevCounter + 1)
    }
    const { defaultValues, fielduserList, setValue, jobTypes, jobs, erroruserList, register, errors, setError } = props
    return timeSheets.map((timeSheet, index) => {
        return <>
            <div className='row align-items-end'>
                <DateRange
                    col='2'
                    defaultValues={defaultValues}
                    setValue={setValue}
                    register={register}
                    errors={errors}
                    setError={setError}
                    defualtValues={{ start: defaultValues['start_date'], end: defaultValues['completion_date'] }}
                    start={{ label: 'start date', name: `${fielduserList}.start_date`, key: `${fielduserList}.start_date` }}
                    end={{ label: 'end date', name: `${fielduserList}.end_date`, key: `${fielduserList}.end_date` }}
                />
                <div className='col-2'>
                    <Select
                        isClearable
                        name={`${fielduserList}.job`}
                        label='job types'
                        setValue={setValue}
                        options={jobTypes}
                        placeholder=''
                        error={erroruserList[`${fielduserList}.day`]}
                    />
                </div>
                <div className='col-2'>
                    <Select
                        isClearable
                        name={`${fielduserList}.job`}
                        label='job'
                        setValue={setValue}
                        options={jobs}
                        placeholder=''
                        error={erroruserList[`${fielduserList}.day`]}
                    />
                </div>
                <div className='col-2 mx-2 align-items-end'>
                    <InputField type='text' label='Day' name={`${fielduserList}.day`} error={erroruserList[`${fielduserList}.day`]} register={register({})} />
                </div>
                <Button color='danger' style={{ marginTop: '2em' }} className='rounded-0 h-100' onClick={() => removeUser(timeSheet)}>x</Button>
            </div>
            <div className='mx-3'>
                <Button onClick={addTimeSheet} color='secondary' className='m-2 text-center rounded-0 btn'>Add Time Sheet</Button>
                {/* <Button onClick={addTimeSheet} color='secondary' className='m-2 text-center rounded-0 btn'>Add User</Button> */}
            </div>
        </>

    })
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