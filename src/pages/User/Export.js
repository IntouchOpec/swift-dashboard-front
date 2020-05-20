import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from 'utils/client'
import { usersDetailURL } from 'utils/endpoint'
import { Card, Table, Button } from 'reactstrap'
import { ChevronDoubleLeft } from 'react-bootstrap-icons'
import { dateFormat } from 'utils/formats'
import Page from 'components/pdf/Export'
import PrintButton from 'components/pdf/PrintButton'
import SelectReact from 'components/forms/SelectReact'

const yearsOption = [
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
]

const monthsOption = [
    { label: 'Jan', value: '1' },
    { label: 'Feb', value: '2' },
    { label: 'Mar', value: '3' },
    { label: 'Apr', value: '4' },
    { label: 'May', value: '5' },
    { label: 'Jun', value: '6' },
    { label: 'Jul', value: '7' },
    { label: 'Aug', value: '8' },
    { label: 'Sep', value: '9' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' },
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

const UserExportPage = props => {
    const [data, setData] = useState({})
    const [yearfilter, setYearFilter] = useState(yearsOption[0])
    const [monthfilter, setMonthFilter] = useState(monthsOption[4])
    useEffect(() => {
        client.get(usersDetailURL.replace(':id', id))
            .then(res => {
                setData(res.data)
            }).catch(err => {

            })
    }, [])

    const onClickYearFilter = field => {
        setYearFilter(field)
    }
    const onClickMonthFilter = field => {
        setMonthFilter(field)
    }

    const { id } = useParams()
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <h2 className='h3'>Export</h2>
                <div className='col-sm-2 col-md-2'>
                    <SelectReact
                        isClearable
                        name='yearsOption'
                        options={yearsOption}
                        onChange={onClickYearFilter}
                        value={yearfilter}
                        placeholder='Year'
                    />
                </div>
                <div className='col-sm-2 col-md-2'>
                    <SelectReact
                        isClearable
                        name='monthsOption'
                        options={monthsOption}
                        onChange={onClickMonthFilter}
                        value={monthfilter}
                        placeholder='Month'
                    />
                </div>
                <div className='col-sm-2 col-md-2'>
                    <PrintButton id={`user-${id}`} label={"Save PDF"} />
                </div>
                <div className='col-sm-2 col-md-2'>
                    <Link to={`/users/${id}`}><Button className=''><ChevronDoubleLeft /> กลับ </Button></Link>
                </div>
            </div>
            <hr />
            <div className='row justify-content-center'>
                <Page id={`user-${id}`}>
                    <Table bordered className='p-4'>
                        <thead>
                            <tr>
                                <th>Staff Name : {data.full_name}</th>
                                <th>Month : {monthfilter.label}</th>
                                <th>Total Assigned : 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan='3' align='center'>Job Name : {FakeData[0].name}</th>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th align='center'>Date</th>
                                <th colSpan='2' align='center'>Workdays</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'>18/05/2020 - 28/05/2020</td>
                                <td colSpan='2' align='center'>40</td>
                            </tr>
                            <tr>
                                <td align='center'>25/05/0202 - 26/05/2020</td>
                                <td colSpan='2' align='center'>12</td>
                            </tr>
                            <tr>
                                <td align='center'>Total</td>
                                <td colSpan='2' align='center'>52</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th colSpan='3' align='center'>Job Name : {FakeData[1].name}</th>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th align='center'>Date</th>
                                <th colSpan='2' align='center'>Workdays</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'>26/05/2020 - 28/05/2020</td>
                                <td colSpan='2' align='center'>20</td>
                            </tr>
                            <tr>
                                <td align='center'>29/05/2020</td>
                                <td colSpan='2' align='center'>8</td>
                            </tr>
                            <tr>
                                <td align='center'>Total</td>
                                <td colSpan='2' align='center'>28</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td align='center'>Grand Total</td>
                                <td colSpan='2' align='center'>80</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Page>
            </div>


        </div>
    )
}

export default UserExportPage