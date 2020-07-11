import React, { useState, useEffect } from 'react'
import CompanyForm from 'components/formLayouts/Company'
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom'
import { Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import client from 'utils/client'
import { companyDetailURL } from 'utils/endpoint'

const EditCompanyPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [defaultValue, setDefaultValue] = useState()
    const [isloading, setIsloading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        client.get(companyDetailURL.replace(':id', id)).then(res => {
            setDefaultValue(res.data)
            setIsloading(false)
            console.log(res.data)
        })
    }, [])

    const submitForm = data => {
        console.log(data)
        client.put(companyDetailURL.replace(':id', id), data)
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
                    <h2 className='h3'>Edit Company</h2>
                </div>
            </div>
            <hr />
            <Card>
                {!isloading && <CompanyForm submitForm={submitForm} errors={errors} defaultValue={defaultValue} />}
            </Card>
        </div>
    )
}

export default EditCompanyPage