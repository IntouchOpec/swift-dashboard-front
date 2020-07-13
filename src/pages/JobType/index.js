import React, { useEffect, useState, Component } from 'react'
import TableBase from 'components/tables/TableBase'
import { jobtypeDetailURL, jobtypeURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { AuthContext } from 'providers'

const LIMIT = 10

const KEYS = ['Job Type Code', 'Job Type Name', 'Created By', '-']

const persissionName={ create: 'add_jobtype', update: 'change_jobtype', read: 'view_jobtype',  }
const filterOptions = [
    { label: 'Job Type Code', value: 'jobtype_code' },
    { label: 'Job Type Name', value: 'jobtype_name' },
    { label: 'Create By', value: 'user' },
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
                <AuthContext.Consumer>{context => {
                    let list = []
                    if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                        list.push(<Link to={`/job_type/edit/${props.id}`}>
                            <Button className='rounded-0 mr-1' color='secondary'>Edit</Button>
                        </Link>)
                    }
                    if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.read)) {
                        list.push(<Button className='rounded-0 mr-1' color='danger' onClick={() => handleClick(props.id)}>Delete</Button>)
                    }
                    if (list.length === 0) {
                        return '-'
                    }
                    return list
                }}
                </AuthContext.Consumer>
            </td>
        </tr>
    )
}
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
                persissionName={persissionName}
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