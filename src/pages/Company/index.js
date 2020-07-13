import React, { useEffect, useState, Component } from 'react'
import TableBase from 'components/tables/TableBase'
import { companyDetailURL, companyURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import client from 'utils/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { AuthContext } from 'providers'

const LIMIT = 10

const KEYS = ['Company Code', 'Company Name', 'Created By', '-']

const filterOptions = [
    { label: 'Company Code', value: 'code' },
    { label: 'Company Name', value: 'cname' },
    { label: 'Create By', value: 'user' },
]
const persissionName = { create: 'add_company', update: 'change_company', read: 'view_company', delete: 'delete_company' }


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
        client.delete(companyDetailURL.replace(':id', id))
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
                <AuthContext.Consumer>{
                    context => {
                        let list = []
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                            list.push(<Link to={`/company/edit/${props.id}`}>
                                <Button className='rounded-0 mr-1' color='secondary'>Edit</Button>
                            </Link>)
                        }
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.read)) {
                            list.push(
                                <Button className='rounded-0 mr-1' color='danger' onClick={() => handleClick(props.id)}>Delete</Button>
                            )
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
    return FakeData.map((company,key)=>
        <tr key={`company-${key}`}>
            <td>{company.code}</td>
            <td>{company.name}</td>
            <td>{props.user}</td>
            <td><Button color='danger'>Delete</Button></td>
        </tr>
    )
} */

const CompanyPage = props => {
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Companies</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase
                persissionName={persissionName}
                isMock={false}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/company/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={companyURL}
            />
        </div>
    )
}
export default CompanyPage