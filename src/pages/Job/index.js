import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL, reportsDetailURL } from 'utils/endpoint'
import { Table, Card, Button, Input } from 'reactstrap'
import { getChartName, dateFormat } from 'utils/formats'
import SwitchButton from 'bootstrap-switch-button-react'

const LIMIT = 10

const KEYS = ['Job Code','Job Name', 'Create By','-']

const filterOptions = [
    {label: 'Job Code', value: 'job_code'},
    {label: 'Job Name', value: 'job_name'},
    {label: 'Create By', value: 'user'},
]

const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])
    return (
    <tr>
        <td>Job-xxx</td>
        <td>Job Name</td>
        <td>{props.user}</td>
        <td><Button color="danger">Delete</Button></td>
    </tr>
)}

const JobPage = props => {

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Jobs</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase 
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/jobs/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={reportsURL}
            />
        </div>
    )
}

export default JobPage