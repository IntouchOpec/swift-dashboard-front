import React, { useState, useEffect } from 'react'
import PermissionForm from 'components/formLayouts/Permission'
import Swal from 'sweetalert2'
import { Card } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import client from 'utils/client'
import { groupsURL, groupsDetailUR } from 'utils/endpoint'

const PermissionDetailPage = props => {
    const history = useHistory()
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [data, setData] = useState()

    useEffect(() => {
        client.get(groupsDetailUR.replace(':id', id)).then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Permission Detail</h2>
                </div>
            </div>
            <hr />
            <Card>
                {JSON.stringify(data)}
            </Card>
        </div>
    )
}
export default PermissionDetailPage