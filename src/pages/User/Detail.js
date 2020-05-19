import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from 'utils/client'
import { usersDetailURL } from 'utils/endpoint'
import { Card, Table, Button } from 'reactstrap'
import { ChevronDoubleLeft } from 'react-bootstrap-icons'
import { dateFormat } from 'utils/formats'

const UserDetailPage = props => {
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
                <h2 className='h3'>Detail User</h2>
                <Link to='/users'><Button className=''><ChevronDoubleLeft/> กลับ </Button></Link>                    
            </div>
            <hr />
            <Card>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>email</td>
                            <td>{data.email}</td>
                            <td>username</td>
                            <td>{data.username}</td>
                        </tr>
                        <tr>
                            <td>full_name</td>
                            <td>{data.full_name}</td>
                            <td>created_at</td>
                            <td>{dateFormat(data.created_at)}</td>
                        </tr>
                        <tr>
                            <td>premissions</td>
                            <td>{data.premissions}</td>
                            <td>last_login</td>
                            <td>{data.last_login ? dateFormat(data.last_login) : '-'}</td>
                        </tr>
                        <tr>
                            <td>updated_at</td>
                            <td>{dateFormat(data.updated_at)}</td>
                            <td>last_login</td>
                            <td>{data.last_login ? dateFormat(data.last_login) : '-'}</td>
                        </tr>
                        <tr>
                            <td>Export</td>
                            <td colSpan='3'><Link to={`/users/export/${id}`}><Button color="warning">Export</Button></Link></td>
                        </tr>
                        {/* <tr> */}
                            {/* <td>type</td>
                            <td>{data.report_type === 0 ? 'S-Curve': 'Manpower Plan'}</td>
                            <td>dowload</td>
                            <td><a href="/images/myw3schoolsimage.jpg" download>{data.path}</a></td>
                        </tr> */}
                        {/* <tr>
                            <td>description</td>
                            <td colSpan='3'>{data.description && data.description.length === 0 ? '-' : data.description}</td>
                        </tr> */}
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}

export default UserDetailPage