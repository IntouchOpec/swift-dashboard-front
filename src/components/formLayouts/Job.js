import React, { useState, useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button } from 'reactstrap'
import SelectField from 'components/forms/SelectField'
import client from 'utils/client'
import { groupsURL } from 'utils/endpoint'

const JobForm = props => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        client.get(groupsURL)
            .then(({ data }) => {
                setGroups(data)
            })
            .catch(err => { })
    }, [])

    const { handleSubmit, errors, register, setValue, setError, reset } = useForm()

    useEffect(() => {
        Object.keys(props.errors).map(key => {
            setError(key, key, props.errors[key][0])
        })
    }, [props.errors])

    return (
        <form onSubmit={handleSubmit(props.sumitForm)} className='d-flex p-3'>
            <div className='col-12 m-0 p-0'>
                <div className='d-flex'>
                    <div className='col-6'>
                        <InputField type='text' label='Job Code' name='jobcode' error={errors['jobcode']} register={register({ required: 'Required' })} />
                    </div>
                    <div className='col-6'>
                        <InputField type='text' label='Job Name' name='jobname' error={errors['jobname']} register={register({ required: 'Required' })} />
                    </div>
                </div>
                <Button type='submit' className='ml-auto mr-3' color='primary'>Submit</Button>
            </div>
        </form>
    )
}

export default JobForm