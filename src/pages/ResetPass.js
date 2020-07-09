import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from 'components/forms/InputField'
import { Button, Card } from 'reactstrap'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { changePassURL } from 'utils/endpoint'

const ResetPass = props => {

    const { register, handleSubmit, setValue, errors, setError } = useForm()

    const submitReset = (data) => {
        console.log(data)
        let pass = {password: data.password}
        data.password !== data.cpassword
        ?
        setError('cpassword', 'manual', 'Password don\'t math')
        :
            client.post(changePassURL, pass)
                .then(res => {
                    Swal.fire('Success !', 'Success .', 'success')
                        .then(result => history.push('/'))
                })
                .catch(error => {
                    setErrors(error.response.data)
                })
    }

    useEffect(() => {
        // register({ name: 'reactSelect', required: true });
    }, [register])

    return (
        // <AuthContext.Consumer>
        <div className='login-page'>
            <div id='wrapper' className='login-container col-12 row p-0 m-0'>
                <div className='left-pane col-12 col-lg-4 p-0 m-0'>
                    <div className='m-5 text-center pt-5'>
                        <h1>CMDASHBOARD</h1>
                        {/* <img className='' height='50px' src={logo_cm} /> */}
                    </div>
                    <Card className='m-5'>
                        <div className='card-body'>
                            <h5 className='card-title'>Reset Password</h5>
                            <form className='row' onSubmit={handleSubmit(submitReset)}>
                                <div className='col-12'>
                                    <InputField className='' type='password' label='New Password' name='password' error={errors['password']} register={register({
                                        required: 'Required',
                                    })}
                                    />
                                    <InputField className='' type='password' label='Confirm Password' name='cpassword' error={errors['cpassword']} register={register({
                                        required: 'Required',
                                    })}
                                    />
                                </div>
                                <Button className='ml-auto mr-3' color='primary'>Reset</Button>
                            </form>
                        </div>
                    </Card>
                </div>
                <div className='right-pane d-none d-lg-block col-8 p-0 m-0'>
                    <div className='bg-default'>
                        <div className='right-pane-content'>
                            <div className='title-msg'>Construction Management Dashboard </div>
                            <div className='body-msg'>Report all your project information in one place, from anywhere with the best benefits</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        //  </AuthContext.Consumer>
    )
}
export default ResetPass 