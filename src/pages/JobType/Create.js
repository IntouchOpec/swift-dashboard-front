import React, { useState, useEffect } from 'react'
import JobTypeForm from 'components/formLayouts/JobType'
import Swal from 'sweetalert2'
import { Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import client from 'utils/client'
import { jobtypeURL, jobtypeDetailURL } from 'utils/endpoint'

const CreateJobTypePage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const submitForm = data => {
        client.post(jobtypeURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/job_type'))
        })
        .catch(error => {
            setErrors(error.response.data)  
        })
    }
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Create Job Type</h2>
                </div>
            </div>
            <hr />
            <Card>
                <JobTypeForm submitForm={submitForm} errors={errors}/>
            </Card>
        </div>
    )
}
export default CreateJobTypePage