import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL, reportsDetailURL, timeSheetURL } from 'utils/endpoint'
import { dateFormat } from 'utils/formats'

const LIMIT = 10

const KEYS = ['Staff', 'Job', 'Start Date', 'End Date', 'Worktime', 'Create By', '']

const filterOptions = [
    { label: 'document_number', value: 'report_type' },
    { label: 'Staff', value: 'title' },
    { label: 'Job', value: 'status' },
    { label: 'Create By', value: 'user__first_name' },
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
            <td>{props.staff.fullname}</td>
            <td>{props.job.code}</td>
            <td>{dateFormat(props.start_date)}</td>
            <td>{dateFormat(props.end_date)}</td>
            <td>{props.day}</td>
            <td>{props.craeted_by.fullname}</td>
            <td></td>
            {/* {JSON.stringify(props)} */}
        </tr>
    )
}

const TimeSheetPage = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        client.get(`${timeSheetURL}?limit=10&page=1`)
            .then(res => {
                setData(res.data.result)
            })
            // .catch(err => {
            //     setData(state => state)
            // })
    }, [])

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
                mockData={data}
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