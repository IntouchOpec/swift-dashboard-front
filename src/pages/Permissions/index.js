import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { groupsURL, groupsDetailUR, timeSheetURL } from 'utils/endpoint'
import { dateFormat } from 'utils/formats'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
const LIMIT = 10

const KEYS = ['No.', 'Name']

const filterOptions = [
    { label: 'document_number', value: 'report_type' },
    { label: 'Staff', value: 'title' },
    { label: 'Job', value: 'status' },
    { label: 'Create By', value: 'user__first_name' },
]

const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])

    const handleClick = id => {
        client.delete(`${groupsDetailUR.replace(':id', id)}`)
        .then(res => {
            setActive(state => !state)
        })
    }

    const onActiveHanlder = () => {
        client.patch(`${groupsDetailUR.replace(':id', props.id)}`, { active: !active })
            .then(res => {
                setActive(state => !state)
            }).catch(err => {
                setActive(state => state)
            })
    }
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>
                <Link to={`/permissions/${props.id}/edit`}>
                    <Button className='rounded-0 mr-1' color='secondary'>Edit</Button>
                </Link>
                <Button className='rounded-0 mr-1' color='danger' onClick={() => handleClick(props.id)}>Delete</Button>
            </td>
            {/* {JSON.stringify(props)} */}
        </tr>
    )
}

const PermissionPage = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        client.get(`${groupsURL}?limit=10&page=1`)
            .then(res => {
                setData(res.data.result)
            })
        // .catch(err => {
        //     setData(state => state)
        // })
    }, [])

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Permissions</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase
                isMock={false}
                mockData={data}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/permissions/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={groupsURL}
            />
        </div>
    )
}

export default PermissionPage