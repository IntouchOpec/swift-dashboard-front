import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL, reportsDetailURL } from 'utils/endpoint'
import { Table, Card, Button, Input } from 'reactstrap'
import { getChartName, dateFormat } from 'utils/formats'
import SwitchButton from 'bootstrap-switch-button-react'
import { AuthContext } from 'providers'

const LIMIT = 10

const KEYS = ['-', 'active', 'Report type', 'path', 'user', 'created at', 'updated at',]
const persissionName = { create: 'add_report', update: 'change_report', read: 'view_report' }
const filterOptions = [
    { label: 'document_number', value: 'report_type' },
    { label: 'title', value: 'title' },
    { label: 'status', value: 'status' },
    { label: 'first_name', value: 'user__first_name' },
    { label: 'last_name', value: 'user__last_name' },
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
            <td>
                <AuthContext.Consumer>{
                    context => {
                        if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.read)) {
                            return <Link to={`/chart/${props.id}`}>
                                <Button className='rounded-0 mr-1' outline color='secondary'>view</Button>
                            </Link>
                        }
                        return '-'
                    }}
                </AuthContext.Consumer>

                {/* <Link to={`/chart/${props.id}/edit`}>
                <Button className='rounded-0' outline color='secondary'>edit</Button>
            </Link> */}
            </td>
            <td>{<SwitchButton onChange={onActiveHanlder} checked={active} size='sm' />}</td>
            <td>{getChartName(props.report_type)}</td>
            <td>{props.path}</td>
            <td>{props.user}</td>
            <td>{dateFormat(props.created_at)}</td>
            <td>{dateFormat(props.updated_at)}</td>
        </tr>
    )
}

const ManageChartPage = props => {

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Chart</h2>
                    </div>
                </div>
            </div>
            <hr />
            <TableBase
                keys={KEYS}
                persissionName={persissionName}
                RowRender={RowRender}
                createPath={'/charts/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={reportsURL}
            />
        </div>
    )
}

export default ManageChartPage