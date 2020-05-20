import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import { reportsURL } from 'utils/endpoint'
import { Button } from 'reactstrap'

const LIMIT = 10

const KEYS = ['Job Code','Job Name', 'Create By','-']

const filterOptions = [
    {label: 'Job Code', value: 'job_code'},
    {label: 'Job Name', value: 'job_name'},
    {label: 'Create By', value: 'user'},
]
const FakeData = [
    {code: '01.001', name: 'Mobilization Machine'},
    {code: '02.001', name: 'Document Control'},
    {code: '03.001', name: 'Piling Work'},
    {code: '03.002', name: 'Footing Work'},
    {code: '03.003', name: 'Column Work'},
    {code: '04.001', name: 'Fire Alarm'},
    {code: '04.002', name: 'Sanitary Work'},
    {code: '04.003', name: 'Lighting'},
    {code: '04.004', name: 'Earthing'},
]
const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])
    console.log(props)
    return (
    <tr>
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td>{props.user}</td>
        <td><Button color='danger'>Delete</Button></td>
    </tr>
)}
/* const RowRender = props => {
    return FakeData.map((job,key)=>
        <tr key={`job-${key}`}>
            <td>{job.code}</td>
            <td>{job.name}</td>
            <td>{props.user}</td>
            <td><Button color='danger'>Delete</Button></td>
        </tr>
    )
} */

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
                isMock={true}
                mockData={FakeData}
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