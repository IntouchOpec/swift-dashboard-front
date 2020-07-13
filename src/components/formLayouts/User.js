import React, { useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button, Card } from 'reactstrap'
import SelectField from 'components/forms/SelectField'

const UserFrom = props => {
    const { submitForm, mode, defaultValues, groups, companys } = props
    const methods = useForm({
        defaultValues
    })

    const { handleSubmit, errors, register, setValue, setError, reset } = methods

    useEffect(() => {
        Object.keys(props.errors).map(key => {
            setError(key, key, props.errors[key][0])
        })
    }, [props.errors])

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>{mode} User</h2>
                </div>
            </div>
            <hr />
            <Card>
                <form onSubmit={handleSubmit(submitForm)} className='d-flex p-3'>
                    <div className='col-12 m-0 p-0'>
                        <div className='d-flex'>
                            <div className='col-6'>
                                <InputField className='' isImportant={true} type='text' label='ชื่อ' name='first_name' error={errors['first_name']} register={register({ required: 'Required' })} />
                            </div>
                            <div className='col-6'>
                                <InputField className='' isImportant={true} type='text' label='นามสกุล' name='last_name' error={errors['last_name']} register={register({ required: 'Required' })} />
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='col-6'>
                                <InputField className='' isImportant={true} type='email' label='อีเมล์ ลอกอิน' name='email' error={errors['email']} register={register({ email: 'user with this email address already exists.', required: 'Required' })} />
                            </div>
                            <div className='col-6'>
                                <SelectField options={companys} isImportant={true} label='Company' name='company' error={errors['company']} innerRef={register({ required: 'Required', })} />
                            </div>
                        </div>
                        {mode !== 'Edit' && <div className='d-flex'>
                            <div className='col-6'>
                                <InputField className='' isImportant={true} type='text' label='ผู้ใช้' name='username' error={errors['username']} register={register({ required: 'Required' })} />
                            </div>
                            {!props.password && <div className='col-6'>
                                <InputField className='' isImportant={true} type='password' label='รหัสผ่าน' name='password' error={errors['password']} register={register({ required: 'Required' })} />
                            </div>}
                        </div>}
                        <div className='d-flex'>
                            <div className='col-6'>
                                <InputField className='' isImportant={true} type='text' label='ตำแหน่ง' name='position' error={errors['position']} register={register({ required: 'Required' })} />
                            </div>
                            <div className='col-6'>
                                <SelectField options={groups} isImportant={true} label='ระดับผู้ใช้' name='group' error={errors['group']} innerRef={register({ required: 'Required', })} />
                            </div>
                        </div>
                        <div className='d-flex mt-3'>
                            <div className='col-6'>
                                <Button type='submit' className='ml-auto mr-3' color='primary'>Submit</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default UserFrom