import React, { useEffect, useState, Component } from 'react'
import TableBase from 'components/tables/TableBase'
import { companyURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import client from 'utils/client'

const LIMIT = 10

const KEYS = ['Company Code','Company Name', 'Create By','-']

const filterOptions = [
    {label: 'Company Code', value: 'company_code'},
    {label: 'Company Name', value: 'company_name'},
    {label: 'Create By', value: 'user'},
]
const FakeData = [
    {code: '001', name: 'Company A', user:'pao'},
    {code: '002', name: 'Company B', user:'pao'},
    {code: '003', name: 'Company C', user:'pao'},
    {code: '004', name: 'Company D', user:'pao'},
    {code: '005', name: 'Company E', user:'pao'},
    {code: '006', name: 'Company F', user:'pao'},
    {code: '007', name: 'Company G', user:'pao'},
    {code: '008', name: 'Company H', user:'pao'},
    {code: '009', name: 'Company I', user:'pao'},
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
        <td>Superadmin swift-dynamics</td>
        <td>
        <Link to={`/company/edit/${props.id}`}>
            <Button className='rounded-0 mr-1' color='secondary'>edit</Button>
        </Link>
        <Button color='danger'>Delete</Button></td>
    </tr>
)}
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
    const [companies, setCompanies] = useState([])
    useEffect(() => {
        client.get(companyURL)
            .then(({ data }) => {
                setCompanies(data.result)
            })
            .catch(err => { })
    }, [])
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
                isMock={true}
                mockData={companies}
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