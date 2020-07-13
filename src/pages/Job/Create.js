import React, { useState } from 'react'
import JobForm from 'components/formLayouts/Job'
import { Card } from 'reactstrap'
import { jobsURL } from 'utils/endpoint'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const CreateJobPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const sumitForm = data => {
        data = {code: data.jobcode, name: data.jobname}
        client.post(jobsURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/jobs'))
        })
        .catch(error => {
            setErrors(error.response.data)
        })
    }

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Create Job</h2>
                </div>
            </div>
            <hr />
            <Card>
                <JobForm sumitForm={sumitForm} errors={errors}/>
            </Card>
        </div>
    )
}

export default CreateJobPage