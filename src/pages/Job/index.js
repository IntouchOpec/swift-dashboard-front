import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import { jobsDetailURL, jobsURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { AuthContext } from 'providers'

const LIMIT = 10

const KEYS = ['Job Code', 'Job Name', 'Created By', '-']

const filterOptions = [
    { label: 'Job Code', value: 'job_code' },
    { label: 'Job Name', value: 'job_name' },
    { label: 'Create By', value: 'user' },
]
const persissionName = { create: 'add_job', update: 'change_job', read: 'view_job', delete: 'delete_job' }

const RowRender = props => {
    function handleClick(id) {
        console.log(id)
        client.delete(jobsDetailURL.replace(':id', id))
            .then(res => {
                Swal.fire('Created !', 'Success .', 'success')
                    .then(result => window.location.reload(false))
            })
    }
    return (
        <tr>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.user}</td>
            <td>
                <AuthContext.Consumer>{
                    context => {
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.delete)) {
                            return <Button color='danger' onClick={() => handleClick(props.id)}>Delete</Button>
                        }
                        return '-'
                    }}
                </AuthContext.Consumer>>
            </td>
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
                persissionName={persissionName}
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