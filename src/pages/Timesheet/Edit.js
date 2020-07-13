import { useForm, FormContext } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import SelectReact from 'components/forms/SelectReact'
import InputField from 'components/forms/InputField'
import DateRange from 'components/forms/DateRangeField'
import client from 'utils/client'
import { timeSheetURL, usersURL, jobsURL, jobTypesURL, timeSheetDetailURL } from 'utils/endpoint'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Button, FormGroup, Label } from 'reactstrap'
import Swal from 'sweetalert2'

const EditTimeSheetPage = props => {
    // const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const [jobTypes, setJobTypes] = useState([])
    const [isloading, setIsloading] = useState(true)
    const [document, setDocument] = useState({})
    const { id } = useParams()

    const history = useHistory()


    useEffect(() => {
        client.get(usersURL).then(res => {
            setUsers(res.data.result.map(user => ({ ...user, value: user.id, label: user.full_name })))
        })
        client.get(jobsURL).then(res => {
            setJobs(res.data.result.map(value => ({ ...value, value: value.id, label: `${value.code}-${value.name}` })))
        })
        client.get(jobTypesURL).then(res => {
            setJobTypes(res.data.result.map(value => ({ ...value, value: value.id, label: `${value.name}` })))
        })
        client.get(timeSheetDetailURL.replace(':id', id)).then(res => {
            setDocument(res.data)
            setIsloading(false)
            console.log(res.data)
        })
    }, [])
    return (
        <>
            {!isloading && <EditForm document={document} jobTypes={jobTypes} jobs={jobs} users={users} id={id} history={history} />}
        </>
    )
}

const EditForm = props => {
    const { document, jobs, jobTypes, users, id, history } = props

    const submitForm = data => {
        let body = {
            job: data.job.id,
            job_type: data.jobTypes.id,
            start_date: data.start_date,
            end_date: data.end_date,
            day: data.day,
        }
        // .replace(':id', id)
        console.log(body)
        client.put(timeSheetDetailURL.replace(':id', id), body)
            .then(res => {
                Swal.fire('Save !', 'Success .', 'success')
                    .then(res => history.push('/timesheet'))
            })
            .catch(err => {
                setErrors(err)
            })
    }

    const methods = useForm({
        mode: 'onChnage',
        defaultValues: {
            ...document,
            end_date: document.end_date ? document.end_date : null,
            jobTypes: document.job_type ? { id: document.job_type.id, value: document.job_type.name } : null,
            day: document.day ? `${document.day.toString()}` : null,
        }
    })

    const { register, unregister, handleSubmit, setValue, errors, setError, clearError } = methods

    return (
        <div className='mt-3'>
            <FormContext {...methods}>
                <div className='row m-0 p-0 justify-content-between'>
                    <h3>Edit TimeSheet</h3>
                    <div >
                        <Button
                            onClick={handleSubmit(submitForm)}
                            type='submit'
                            color='warning' className='m-2 text-center rounded-0 btn'>
                            Save
                    </Button>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit(submitForm)}>
                    <Card className='m-3'>
                        <div className='row' key={'fielduserList'}>
                            <div className='col-8 mx-2 align-items-end'>
                                <h5>{`Staff : ${document.staff.fullname}`}</h5>
                            </div>
                        </div>
                        <div className='row ml-2'>
                            <div className='col-2'>
                                <Select
                                    isClearable
                                    name={`jobTypes`}
                                    label='job types'
                                    setValue={setValue}
                                    defaultValues={{ id: document.job_type.id, value: document.job_type.name, label: document.job_type.name }}
                                    rules={{ required: 'Required' }}
                                    required={true}
                                    options={jobTypes}
                                    placeholder=''
                                    register={register}
                                    error={errors[`jobTypes`]}
                                />
                            </div>
                            <div className='col-3'>
                                <Select
                                    isClearable
                                    register={register}
                                    required={true}
                                    defaultValues={{ id: document.job.id, label: document.job.name, value: document.job.name }}
                                    name={`job`}
                                    label='job'
                                    setValue={setValue}
                                    options={jobs}
                                    placeholder=''
                                    error={errors[`job`]}
                                />
                            </div>
                            <DateRange
                                col='2'
                                defaultValues={document}
                                setValue={setValue}
                                register={register}
                                setError={setError}
                                clearError={clearError}
                                // setValue=
                                errors={errors}
                                required={true}
                                setError={setError}
                                defualtValues={{ start: document['start_date'], end: document['end_date'] }}
                                start={{ label: 'start date', name: `start_date`, key: `start_date` }}
                                end={{ label: 'end date', name: `end_date`, key: `end_date` }}
                            />
                            <div className='col-2 mx-2 align-items-end'>
                                <InputField type='text' label='Day' name='day' error={errors[`day`]} register={register({ required: true })} />
                            </div>
                        </div>
                    </Card>
                </form>
            </FormContext>
        </div>
    )
}

const Select = props => {
    const [data, setData] = useState()

    const { name, label, options, setValue, placeholder, error, register, defaultValues } = props
    let message

    useEffect(() => {
        register(name)
        setValue(name, defaultValues)
        setData(defaultValues)
        console.log(error)
    }, [])


    if (error) {
        message = error.message
    }

    const onChange = item => {
        console.log(item)
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


export default EditTimeSheetPage
