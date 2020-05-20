import React, { useEffect, useState } from 'react'
// import SCurve from 'components/user/SCurve'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { usersURL, usersDetailURL } from 'utils/endpoint'
import { Table, Card, Button, Input } from 'reactstrap'
import { getChartName, dateFormat } from 'utils/formats'
import SwitchButton from 'bootstrap-switch-button-react'

const LIMIT = 10


const filterOptions = [
    {label: 'document_number', value: 'report_type'},
    {label: 'title', value: 'title'},
    {label: 'status', value: 'status'},
    {label: 'first_name', value: 'user__first_name'},
    {label: 'last_name', value: 'user__last_name'},
]

// name: 'superadmin@swiftdynamics.co.th'
// username: 'superadmin'
// last_name: 'swift-dynamics'
// first_name: 'Superadmin'

const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])

    const onActiveHanlder = () => {
        client.patch(`${usersDetailURL.replace(':id', props.id)}`, {active: !active})
        .then(res => {
            setActive(state => !state)
        }).catch(err => {
            setActive(state => state)
        })
    }

    return (
        <tr>
            <td>
                <Link to={`/user/${props.id}`}>
                    <Button className='rounded-0 mr-1' outline color='secondary'>view</Button>
                </Link>
                {/* <Link to={`/user/${props.id}/edit`}>
                    <Button className='rounded-0' outline color='secondary'>edit</Button>
                </Link> */}
            </td>
            <td>{<SwitchButton onChange={onActiveHanlder} checked={active} size='sm'/>}</td>
            <td>{props.username}</td>
            <td>{props.role}</td>
            <td>{props.email}</td>
            <td>{props.full_name}</td>
            <td>{props.created_by}</td>
            <td>{props.last_login ? dateFormat(props.last_login) : '-'}</td>
            <td>{dateFormat(props.created_at)}</td>
            <td>{dateFormat(props.updated_at)}</td>
        </tr>
    )
}
const KEYS = ['-','active','username','role','email', 'full_name', 'created_by', 'last_login', 'created_at','updated_at',]

const UserPage = props => {

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>User</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase 
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/users/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={usersURL}
            />
        </div>
    )
}

export default UserPage