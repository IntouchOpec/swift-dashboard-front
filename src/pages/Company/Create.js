import React, { useState, useEffect } from 'react'
import CompanyForm from 'components/formLayouts/Company'
import Swal from 'sweetalert2'
import { Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { companyURL } from 'utils/endpoint'
import client from 'utils/client'

const CreateCompanyPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const submitForm = data => {
        console.log(data)
        client.post(companyURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/company'))
        })
        .catch(error => {
            setErrors(error.response.data)  
        })
    }

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Create Company</h2>
                </div>
            </div>
            <hr />
            <Card>
                <CompanyForm submitForm={submitForm} errors={errors}/>
            </Card>
        </div>
    )
}

export default CreateCompanyPage