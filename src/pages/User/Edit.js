import React, { useState, useEffect } from 'react'
import UserForm from 'components/formLayouts/User'
import { Card } from 'reactstrap'
import { usersURL, usersDetailURL } from 'utils/endpoint'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory, useParams, } from 'react-router-dom'
import { groupsURL, companyURL } from 'utils/endpoint'

const EditUserPage = props => {
    const history = useHistory()
    const { id } = useParams();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

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

        setTimeout(() => {
            client.get(usersDetailURL.replace(':id', id))
                .then(res => {
                    if (res.data.group) {
                        res.data.group = `${res.data.group.id}`
                    }
                    if (res.data.company) {
                        res.data.company = `${res.data.company.id}`
                    }
                    setData(res.data)
                    setLoading(false)
                }).catch(err => {
                })
        }, 2000);


    }, [])

    const submitForm = data => {
        /* client.post(usersURL, data)
            .then(res => {
                Swal.fire('Created !', 'Success .', 'success')
                    .then(result => history.push('/users'))
            })
            .catch(error => {
                setErrors(error.response.data)
            }) */
    }

    return (
        <>
            {!loading &&
                <UserForm submitForm={submitForm} mode='Edit' errors={errors} defaultValues={data}
                    groups={groups}
                    companys={companys} />
            }
        </>
    )
}

export default EditUserPage