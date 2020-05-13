import React, { useState } from 'react'
import UserForm from 'components/formLayouts/User'
import { Card } from 'reactstrap'
import { usersURL } from 'utils/endpoint'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const CreateUserPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const sumitForm = data => {
        client.post(usersURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/users'))
        })
        .catch(error => {
            setErrors(error.response.data)
        })
    }

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Create User</h2>
                </div>
            </div>
            <hr />
            <Card>
                <UserForm sumitForm={sumitForm} errors={errors}/>
            </Card>
        </div>
    )
}

export default CreateUserPage