import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import InputFild from 'components/forms/InputField'
import { Button } from 'reactstrap'
import CheckboxField from 'components/forms/CheckboxField'

const FormSignIn = ({submitLogIn}) => {
    const { register, handleSubmit, setValue, errors} = useForm()

    useEffect(() => {
        // register({ name: 'reactSelect', required: true });
    }, [register])

    return (
        <form className='row' onSubmit={handleSubmit(submitLogIn)}>
            <div className='col-12'>
                <InputFild className='' type='email' label='email' name='email' errors={errors} register={register({
                    required: 'Required',
                    pattern: { message: 'invalid email address' }})}
                />
            </div>
            <div className='col-12'>
                <InputFild  className='' type='password' label='password' name='password' errors={errors} register={register({required: 'Required',})}/>
            </div>
            {/* <div className='col-6'> */}
                <CheckboxField className='ml-3' text='Remember Me'/>
            {/* </div>  */}
                <Button className='ml-auto mr-3' color='primary'>sign in</Button>{' '}
        </form>
    )
}

export default FormSignIn