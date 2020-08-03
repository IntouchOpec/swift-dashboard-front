import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from 'components/forms/InputField'
import { Button, FormGroup, Label, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import CheckboxField from 'components/forms/CheckboxField'
import { Eye, EyeSlash } from 'react-bootstrap-icons'

const FormSignIn = ({ submitLogIn }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const { register, handleSubmit, setValue, errors } = useForm()

    useEffect(() => {
        // register({ name: 'reactSelect', required: true });
    }, [register])

    return (
        <form className='row' onSubmit={handleSubmit(submitLogIn)}>
            <div className='col-12'>
                <InputField className='' type='email' label='email' name='email' error={errors['email']} register={register({
                    required: 'Required',
                    pattern: { message: 'invalid email address' }
                })}
                />
            </div>
            <div className='col-12'>
                <FormGroup >
                    <Label htmlFor={`password-password`}>password</Label>
                    <InputGroup>
                        <Input type={isShowPassword ? 'text' : 'password'} id={`password-password`} name='password' invalid={errors.password && true} innerRef={register({ required: 'Required', })} />
                        <InputGroupAddon addonType='append'>
                            <Button onClick={() => setIsShowPassword(state => !state)} color='secondary'>{isShowPassword ? <EyeSlash /> : <Eye />}</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </FormGroup>
            </div>
            {/* <div className='col-6'> */}
            <CheckboxField className='ml-3' text='Remember Me' />
            {/* </div>  */}
            <Button className='ml-auto mr-3' color='primary'>sign in</Button>{' '}
        </form>
    )
}

export default FormSignIn