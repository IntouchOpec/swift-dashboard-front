import React, { useState, useEffect } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import SelectReact from 'components/forms/SelectReact'
import DateRange from 'components/forms/DateRangeField'
import { Button, FormGroup, Label, Card } from 'reactstrap'
import InputField from 'components/forms/InputField'
import { XSquareFill } from 'react-bootstrap-icons'
import { Controller } from 'react-hook-form'
import { isEmpty } from 'utils'

const TimeSheetForm = props => {
    const { submitForm, users, defaultValues, jobs, jobTypes } = props
    const [userList, setuserList] = useState([0])
    const [counter, setCounter] = useState(1)
    const methods = useForm()
    const { register, unregister, handleSubmit, setValue, errors, setError, clearError } = methods

    const removeUser = index => {
        setuserList(prevIndexes => [...prevIndexes.filter(item => item !== index)])
        const fielduserList = `users[${index}]`
        unregister(`${fielduserList}.`)
    }

    const addUser = () => {
        let count = 0
        setuserList(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => {
            count = prevCounter + 1
            return count
        })
    }

    return (
        <>
            <FormContext {...methods}>
                <div className='row m-0 p-0 justify-content-between'>
                    <h3>New TimeSheet</h3>
                    <div >
                        <Button
                            onClick={handleSubmit(submitForm)}
                            type='submit'
                            disabled={!isEmpty(errors)}
                            color='warning' className='m-2 text-center rounded-0 btn'>
                            Submit
                    </Button>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit(submitForm)}>
                    {userList.map((timeSheet, index) => {
                        const fielduserList = `users[${index}]`
                        let erroruserList = {}
                        if (!!errors.userList) {
                            if (errors.userList[index]) {
                                Object.keys(errors.userList[index]).forEach(key => {
                                    erroruserList[`${fielduserList}.${key}`] = errors.userList[index][key]
                                })
                            }
                        }
                        return (
                            <Card className='m-3'>
                                <div className='row' key={fielduserList}>
                                    <div className='col-8 mx-2 align-items-end'>
                                        <SelectField
                                            index={index}
                                            clearError={clearError}
                                            rules={{ required: 'Required' }}
                                            errors={errors}
                                            register={register}
                                            required={true}
                                            setError={setError}
                                            setValue={setValue}
                                            name={`${fielduserList}.user`}
                                            label='user'
                                            options={users}
                                            placeholder=''
                                        />
                                    </div>
                                    <div className="col-2">
                                        <Button color='danger' style={{ marginTop: '2em' }} className='rounded-0' onClick={() => removeUser(index)}>Remove User</Button>
                                    </div>
                                </div>
                                <TimeSheetDetail
                                    defaultValues={defaultValues}
                                    fielduserList={fielduserList}
                                    setValue={setValue}
                                    clearError={clearError}
                                    register={register}
                                    jobTypes={jobTypes}
                                    jobs={jobs}
                                    errors={errors}
                                    setError={setError}
                                    erroruserList={erroruserList}
                                />
                            </Card>
                        )
                    })}
                    <div className='mx-3'>
                        <Button color='secondary' style={{ marginTop: '2em' }} className='rounded-0' onClick={addUser}>Add User</Button>
                    </div>
                </form>
            </FormContext>
        </>
    )
}


const TimeSheetDetail = props => {
    const [timeSheets, setTimeSheet] = useState([0])
    const [counter, setCounter] = useState(1)

    const addTimeSheet = () => {
        setTimeSheet(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => prevCounter + 1)
    }

    const removeTimeSheet = index => {
        setTimeSheet(prevIndexes => [...prevIndexes.filter(item => item !== index)])
        unregister(`${fielduserList}.timeSheet[${index}]`)
    }

    const { defaultValues, fielduserList, setValue, jobTypes, jobs, erroruserList, register, errors, setError, clearError } = props
    return <>
        {timeSheets.map((timeSheet, index) => {
            let fieldTimeSheet = `${fielduserList}.timeSheet[${index}]`
            return <>
                <div className='row ml-2'>
                    <div className='col-2'>
                        <Select
                            isClearable
                            index={index}
                            name={`${fieldTimeSheet}.jobTypes`}
                            label='job types'
                            setValue={setValue}
                            rules={{ required: 'Required' }}
                            required={true}
                            options={jobTypes}
                            placeholder=''
                            register={register}
                            error={erroruserList[`${fieldTimeSheet}.jobTypes`]}
                        />
                    </div>
                    <div className='col-3'>
                        <Select
                            isClearable
                            register={register}
                            required={true}
                            name={`${fieldTimeSheet}.job`}
                            label='job'
                            setValue={setValue}
                            options={jobs}
                            placeholder=''
                            error={erroruserList[`${fieldTimeSheet}.day`]}
                        />
                    </div>
                    <DateRange
                        col='2'
                        defaultValues={defaultValues}
                        setValue={setValue}
                        register={register}
                        setError={setError}
                        clearError={clearError}
                        // setValue=
                        errors={errors}
                        required={true}
                        setError={setError}
                        defualtValues={{ start: defaultValues['start_date'], end: defaultValues['completion_date'] }}
                        start={{ label: 'start date', name: `${fieldTimeSheet}.start_date`, key: `${fieldTimeSheet}.start_date` }}
                        end={{ label: 'end date', name: `${fieldTimeSheet}.end_date`, key: `${fieldTimeSheet}.end_date` }}
                    />
                    <div className='col-1 mx-2 align-items-end'>
                        <InputField type='text' label='Day' name={`${fieldTimeSheet}.day`} error={erroruserList[`${fieldTimeSheet}.day`]} register={register({})} />
                    </div>
                    <Button color='danger' style={{ marginTop: '2em' }} className='rounded-0 h-100' onClick={() => removeTimeSheet(index)}>Remove Time Sheet</Button>
                </div>
            </>
        })}
        <div className='mx-3'>
            <Button onClick={addTimeSheet} color='secondary' className='m-2 text-center rounded-0 btn'>Add Time Sheet</Button>
        </div>
    </>
}

const Select = props => {
    const [data, setData] = useState()

    const { name, label, options, setValue, placeholder, error, register } = props
    let message

    useEffect(() => {
        register(name)
    }, [])


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
                register={register}
                placeholder={placeholder}
            />
            {message && <div style={{ width: '100%', marginTop: '.25rem', fontSize: '80%', color: '#dc3545' }}>{message}</div>}
        </FormGroup>
    )
}

const SelectField = props => {
    const [data, setData] = useState()
    // const { setError, clearError } = useFormContext()
    const { index, error, errors, name, label, options, setValue, placeholder, register, required, setError, rules, clearError } = props
    let message

    useEffect(() => {
        // setError(name, 'required', `User is required!`)
    }, [data])

    useEffect(() => {
        register({ name, required: `User is required!` })
        // setError(name, 'required', `User is required!`)
    }, [])

    if (error) {
        message = error.message
    }
    if (errors['users']) {
        if (errors['users'][index]) {
            if (errors['users'][index].user) {
                message = errors['users'][index].user.message
            }
        }
    }

    const onChange = item => {
        setData(item)
        setValue(name, item)
        clearError(name)
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
                    <div className='m-3'>{`${data.full_name === '- -' ? `${data.first_name_th} ${data.last_name_th}` : data.full_name} (${data.first_name_th} ${data.last_name_th})`}</div>
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
                        label={label}
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