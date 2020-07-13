import React, { useState, useEffect } from 'react'
import JobTypeForm from 'components/formLayouts/JobType'
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom'
import { Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import client from 'utils/client'
import { jobtypeURL, jobtypeDetailURL } from 'utils/endpoint'

const EditJobTypePage = props => {
    const history = useHistory()
    const [defaultValue, setDefaultValue] = useState()
    const [isloading, setIsloading] = useState(true)
    const [errors, setErrors] = useState({})
    const { id } = useParams()

    useEffect(() => {
        client.get(jobtypeDetailURL.replace(':id', id)).then(res => {
            setDefaultValue(res.data)
            setIsloading(false)
        })
    }, [])

    const submitForm = data => {
        client.put(jobtypeDetailURL.replace(':id', id), data)
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
                    <h2 className='h3'>Edit Job Type</h2>
                </div>
            </div>
            <hr />
            <Card>
                {!isloading && <JobTypeForm submitForm={submitForm} errors={errors} defaultValue={defaultValue} />}
            </Card>
        </div>
    )
}
export default EditJobTypePage