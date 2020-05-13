import React, { useState, useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button } from 'reactstrap'
import SelectField from 'components/forms/SelectField'
import client from 'utils/client'
import { groupsURL } from 'utils/endpoint'

const UserFrom = props => {
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
                        <InputField type='text' label='ชื่อ' name='first_name' error={errors['first_name']} register={register({ required: 'Required' })} />
                    </div>
                    <div className='col-6'>
                        <InputField type='text' label='นามสกุล' name='last_name' error={errors['last_name']} register={register({ required: 'Required' })} />
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='col-6'>
                        <InputField type='email' label='อีเมล์ ลอกอิน' name='email' error={errors['email']} register={register({ email: 'user with this email address already exists.', required: 'Required' })} />
                    </div>
                    <div className='col-6'>
                        <InputField type='email' label='ที่อยู่อีเมล' name='email_address' error={errors['email_address']} register={register({ required: 'Required' })} />
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='col-6'>
                        <InputField type='text' label='ผู้ใช้' name='username' error={errors['username']} register={register({ required: 'Required' })} />
                    </div>
                    {!props.password && <div className='col-6'>
                        <InputField type='password' label='รหัสผ่าน' name='password' error={errors['password']} register={register({ required: 'Required' })} />
                    </div>}
                </div>
                <div className='d-flex'>
                    <div className='col-6'>
                        <InputField type='text' label='ตำแหน่ง' name='position' error={errors['position']} register={register({ required: 'Required' })} />
                    </div>
                    <div className='col-6'>
                        <SelectField options={groups} label='ระดับผู้ใช้' name='group' error={errors['group']} innerRef={register({ required: 'Required', })} />
                    </div>
                </div>
                <Button type='submit' className='ml-auto mr-3' color='primary'>Submit</Button>
            </div>
        </form>
    )
}

export default UserFrom