import React, { useEffect, useState, Component } from 'react'
import TableBase from 'components/tables/TableBase'
import { jobtypeDetailURL, jobtypeURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const LIMIT = 10

const KEYS = ['Job Type Code','Job Type Name', 'Create By','-']

const filterOptions = [
    {label: 'Job Type Code', value: 'jobtype_code'},
    {label: 'Job Type Name', value: 'jobtype_name'},
    {label: 'Create By', value: 'user'},
]
const FakeData = [
    {code: '001', name: 'Job Type A', user:'pao'},
    {code: '002', name: 'Job Type B', user:'pao'},
    {code: '003', name: 'Job Type C', user:'pao'},
    {code: '004', name: 'Job Type D', user:'pao'},
    {code: '005', name: 'Job Type E', user:'pao'},
    {code: '006', name: 'Job Type F', user:'pao'},
    {code: '007', name: 'Job Type G', user:'pao'},
    {code: '008', name: 'Job Type H', user:'pao'},
    {code: '009', name: 'Job Type I', user:'pao'},
]
  
const RowRender = props => {
    const history = useHistory()
    const [active, setActive] = useState(false)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        setActive(props.active)
    }, [props.id])
    console.log(props)
    function handleClick(id) {
        console.log(id)
        client.delete(jobtypeDetailURL.replace(':id', id))
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => window.location.reload(false))
        })
    }
    return (
    <tr>
        <td>{props.code}</td>
        <td>{props.name}</td>
        <td>Superadmin swift-dynamics</td>
        <td>
        <Link to={`/job_type/edit/${props.id}`}>
            <Button className='rounded-0 mr-1' color='secondary'>Edit</Button>
        </Link>
        <Button className='rounded-0 mr-1' color='danger' onClick={() => handleClick(props.id)}>Delete</Button></td>
    </tr>
)}
/* const RowRender = props => {
    return FakeData.map((jobtype,key)=>
        <tr key={`jobtype-${key}`}>
            <td>{jobtype.code}</td>
            <td>{jobtype.name}</td>
            <td>{props.user}</td>
            <td><Button color='danger'>Delete</Button></td>
        </tr>
    )
} */    

const JobTypePage = props => {
    const [jobtype, setJobtype] = useState([])
    useEffect(() => {
        client.get(jobtypeURL)
            .then(({ data }) => {
                setJobtype(data.result)
            })
            .catch(err => { })
    }, [])
    return (
        <div className='mt-4'>
                <div className='d-flex'>
                    <div>
                        <h3>Job Types</h3>
                    </div>
            </div>
            <hr />
            <TableBase 
                isMock={true}
                mockData={jobtype}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/job_type/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={jobtypeURL}
            />
        </div>
    )
}
export default JobTypePage