import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import { reportsURL, jobsURL } from 'utils/endpoint'
import { Button } from 'reactstrap'

const LIMIT = 10

const KEYS = ['Job Code', 'Job Name', 'Created By', '-']

const filterOptions = [
    { label: 'Job Code', value: 'job_code' },
    { label: 'Job Name', value: 'job_name' },
    { label: 'Create By', value: 'user' },
]

const RowRender = props => {
    return (
        <tr>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.user}</td>
            <td><Button color='danger'>Delete</Button></td>
        </tr>
    )
}

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
                isMock={false}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/jobs/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={jobsURL}
            />
        </div>
    )
}

export default JobPage