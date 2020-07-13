import React, { useEffect, useState } from 'react'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL, reportsDetailURL, timeSheetURL, timeSheetDetailURL } from 'utils/endpoint'
import { dateFormat } from 'utils/formats'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'
import { AuthContext } from 'providers'

const LIMIT = 10

const KEYS = ['Staff', 'Job', 'Start Date', 'End Date', 'Worktime', 'Created By', 'Edit']

const filterOptions = [

]

const persissionName = { create: 'add_timesheet', update: 'change_timesheet', read: 'view_timesheet' }


const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])

    function handleClick(id) {
        client.delete(timeSheetDetailURL.replace(':id', id))
            .then(res => {
                Swal.fire('Created !', 'Success .', 'success')
                    .then(result => window.location.reload(false))
            })
    }

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
            <td>
                <AuthContext.Consumer>{
                    context => {
                        let list = []
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                            list.push(<Link to={`/timesheet/edit/${props.id}`}>
                                <Button>Edit</Button>
                            </Link>)
                        }
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                            list.push(<Button color='danger' onClick={() => handleClick(props.id)}>Delete</Button>)
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
                isMock={false}
                persissionName={persissionName}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/timesheet/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={timeSheetURL}
            />
        </div>
    )
}

export default TimeSheetPage