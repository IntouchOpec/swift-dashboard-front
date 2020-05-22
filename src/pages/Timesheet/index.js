import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL, reportsDetailURL } from 'utils/endpoint'
import { Table, Card, Button, Input } from 'reactstrap'
import { getChartName, dateFormat } from 'utils/formats'
import SwitchButton from 'bootstrap-switch-button-react'

const LIMIT = 10

const KEYS = ['Staff', 'Job', 'Start Date', 'End Date', 'Worktime', 'Create By', 'Description']

const filterOptions = [
    { label: 'document_number', value: 'report_type' },
    { label: 'Staff', value: 'title' },
    { label: 'Job', value: 'status' },
    { label: 'Create By', value: 'user__first_name' },
]

const FakeData = [
    {Sname: 'PRAMWANEE PREDAPUN', Jname: 'Mobilization Machine'},
    {Sname: 'PRAMWANEE PREDAPUN', Jname: 'Document Control'},
    {Sname: 'SANTI CHATNARONGCHAI', Jname: 'Piling Work'},
    {Sname: 'SANTI CHATNARONGCHAI', Jname: 'Footing Work'},
    {Sname: 'PRAMWANEE PREDAPUN', Jname: 'Column Work'},
    {Sname: 'PRAMWANEE PREDAPUN', Jname: 'Fire Alarm'},
    {Sname: 'SANTI CHATNARONGCHAI', Jname: 'Sanitary Work'},
    {Sname: 'SANTI CHATNARONGCHAI', Jname: 'Lighting'},
    {Sname: 'PRAMWANEE PREDAPUN', Jname: 'Earthing'},
]

const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])

    const onActiveHanlder = () => {
        client.patch(`${reportsDetailURL.replace(':id', props.id)}`, { active: !active })
            .then(res => {
                setActive(state => !state)
            }).catch(err => {
                setActive(state => state)
            })
    }
    return (
        <tr>
            <td>{props.Sname}</td>
            <td>{props.Jname}</td>
            <td>19/05/2020</td>
            <td>20/05/2020</td>
            <td>1 Day</td>
            <td>Superadmin swift-dynamics</td>
            <td>......</td>
        </tr>
    )
}

const TimeSheetPage = props => {

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Timesheet</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase
                isMock={true}
                mockData={FakeData}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/timesheet/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={reportsURL}
            />
        </div>
    )
}

export default TimeSheetPage