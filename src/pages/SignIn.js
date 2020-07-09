import React from 'react'
import { Card } from 'reactstrap'
import FormSingIn from 'components/formLayouts/SignIn'
import { LockFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'querystring'
import { AUTH_AUTHENTICATED } from 'utils'
import Swal from 'sweetalert2'

console.log(process.env.HOST)
const submitLogIn = dispatch => {
    return (data) => axios.post(` ${process.env.HOST}/api/o/token/`, qs.stringify({
            'username': data.email,
            'password': data.password,
            'grant_type': 'password',
            'client_id': process.env.client_id,
            'client_secret': process.env.client_secret
        })
    ,config).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('refreshToken', JSON.stringify(res.data.token))
        
        dispatch({
            type: AUTH_AUTHENTICATED,
            payload: res.data
        })
    }).catch(err => Swal.fire({
        type: 'error',
        title: 'รหัสไม่ถูกต้อง กรุณากรอกผ่านใหม่อีกครั้ง',
        showConfirmButton: false,
        timer: 1500
    }))
}

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

const SignIn = props => {
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
                                <h5 className='card-title'> <LockFill/>Account Longin</h5>
                                <FormSingIn submitLogIn={submitLogIn(props.dispatch)}/>
                            </div>
                        </Card>
                        <div className='m-5'>
                            <h6>Forgot your password?</h6>
                            <Link to='/forgotpassword'>Password reset instructions</Link>
                        </div>
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
export default SignIn 