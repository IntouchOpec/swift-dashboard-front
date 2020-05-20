import React, { useState, useEffect } from 'react'
import client from 'utils/client'
import { useParams, Link } from 'react-router-dom'
import { reportsDetailURL } from 'utils/endpoint'
import { Card, Table, Button } from 'reactstrap'
import { dateFormat } from 'utils/formats'
import CardChart from 'components/charts/CardChart'
import SCurve from 'components/charts/SCurve'
import ManpowerPlan from 'components/charts/ManpowerPlan'
import { ChevronDoubleLeft } from 'react-bootstrap-icons'

const ChartDetailPage = props => {
    const [data, setData] = useState({})
    const { id } = useParams()
    useEffect( () => {
        client.get(reportsDetailURL.replace(':id', id)).then(res => {
            setData(res.data)
        }) 
    }, [])

    return (
        <div className='mt-4'>
            <div className='d-flex justify-content-between'>
                <h2>{data.report_type === 0 ? 'S-Curve': 'Manpower Plan'} Report {dateFormat(data.day)}</h2>
                <Link to='/charts'><Button className=''><ChevronDoubleLeft/> กลับ </Button></Link>
            </div>
            <Card>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>created_by</td>
                            <td>{data.user}</td>
                            <td>created_at</td>
                            <td>{dateFormat(data.created_at)}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>{data.report_type === 0 ? 'S-Curve': 'Manpower Plan'}</td>
                            <td>dowload</td>
                            <td><a href='/images/myw3schoolsimage.jpg' download>{data.path}</a></td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td colSpan='3'>{data.description && data.description.length === 0 ? '-' : data.description}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            { data.report_type === 0 &&
                <CardChart className='mt-3 card' rows={data.source} RenderChildren={SCurve} name='SCurve'/>}
            { data.report_type === 1 &&
                <CardChart className='mt-3 card' RenderChildren={ManpowerPlan} rows={data.source} name='ManpowerPlan'/>}
        </div>

    )
}

export default ChartDetailPage