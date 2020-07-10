import React, { useState, useEffect } from 'react'
import UserForm from 'components/formLayouts/User'
import { Card } from 'reactstrap'
import { usersURL } from 'utils/endpoint'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { groupsURL, companyURL } from 'utils/endpoint'
import { useHistory } from 'react-router-dom'

const CreateUserPage = props => {
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [groups, setGroups] = useState([])
    const [companys, setCompanys] = useState([])
    useEffect(() => {
        client.get(groupsURL)
            .then(({ data }) => {
                setGroups(data.result)
            })
            .catch(err => { })
        client.get(companyURL)
            .then(({ data }) => {
                setCompanys(data.result)
            })
            .catch(err => { })

    }, [])

    const submitForm = data => {
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

        groups && companys && <UserForm submitForm={submitForm} mode='Create' errors={errors} groups={groups} companys={companys} />
    )
}

export default CreateUserPage