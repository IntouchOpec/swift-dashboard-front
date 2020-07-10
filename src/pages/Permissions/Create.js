import React, { useState, useEffect } from 'react'
import PermissionForm from 'components/formLayouts/Permission'
import Swal from 'sweetalert2'
import { Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import client from 'utils/client'
import { groupsURL, groupsDetailUR } from 'utils/endpoint'

const CreatePermissionPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const submitForm = data => {
        client.post(groupsURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/permissions'))
        })
        .catch(error => {
            setErrors(error.response.data)  
        })
    }
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Create Permissions</h2>
                </div>
            </div>
            <hr />
            <Card>
                <PermissionForm defaultValues={{}} submitForm={submitForm} errors={errors}/>
            </Card>
        </div>
    )
}
export default CreatePermissionPage