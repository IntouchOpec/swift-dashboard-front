import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from 'utils/client'
import { usersDetailURL } from 'utils/endpoint'
import { Card, Table, Button } from 'reactstrap'
import { ChevronDoubleLeft } from 'react-bootstrap-icons'
import { dateFormat } from 'utils/formats'

const UserExportPage = props => {
    const [data, setData] = useState({})

    useEffect(() => {
        client.get(usersDetailURL.replace(':id', id))
            .then(res => {
                setData(res.data)
            }).catch(err => {

            })  
    } , [])
    const { id } = useParams()
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <h2 className='h3'>Export</h2>
                <Link to={`/users/${id}`}><Button className='' color="success">Save</Button></Link>  
                <Link to={`/users/${id}`}><Button className=''><ChevronDoubleLeft/> กลับ </Button></Link>                    
            </div>
            <hr />
        </div>
    )
}

export default UserExportPage