import React, { useState, useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button } from 'reactstrap'
import SelectField from 'components/forms/SelectField'
import client from 'utils/client'

const CompanyForm = props => {
    const { defaultValue } = props

    const methods = useForm({
        mode: 'onChnage',
        defaultValues: {
            ...defaultValue,
        }
    })

    const { register, unregister, handleSubmit, setValue, errors, setError, clearError } = methods

    useEffect(() => {
        Object.keys(props.errors).map(key => {
            setError(key, key, props.errors[key][0])
        })
    }, [props.errors])

    return (
        <form onSubmit={handleSubmit(props.submitForm)} className='d-flex p-3'>
            <div className='col-12 m-0 p-0'>
                <div className='d-flex'>
                    <div className='col-6'>
                        <InputField type='text' label='Company Code' name='code' error={errors['companycode']} register={register({ required: 'Required' })} />
                    </div>
                    <div className='col-6'>
                        <InputField type='text' label='Company Name' name='name' error={errors['companyname']} register={register({ required: 'Required' })} />
                    </div>
                </div>
                <Button type='submit' className='ml-auto mr-3' color='primary'>Submit</Button>
            </div>
        </form>
    )
}

export default CompanyForm