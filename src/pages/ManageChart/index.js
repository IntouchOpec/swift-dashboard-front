import React, { useEffect, useState } from 'react'
// import SCurve from 'components/charts/SCurve'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { reportsURL } from 'utils/endpoint'
import { Table, Card, Button, Input } from 'reactstrap'
import { getChartName, dateFormat } from 'utils/formats'

const LIMIT = 10

const KEYS = ['report_type','path','user','created_at','updated_at',]

const filterOptions = [
    {label: 'document_number', value: 'report_type'},
    {label: 'title', value: 'title'},
    {label: 'status', value: 'status'},
    {label: 'first_name', value: 'user__first_name'},
    {label: 'last_name', value: 'user__last_name'},
]

const RowRender = props => (
    <tr>
        <td>
            <Link to={`/charts/${props.id}`}>
                <Button className='rounded-0 mr-1' outline color="secondary">view</Button>
            </Link>
            <Link to={`/charts/${props.id}/edit`}>
                <Button className='rounded-0' outline color="secondary">edit</Button>
            </Link>
        </td>
        <td>{getChartName(props.report_type)}</td>
        <td>{props.path}</td>
        <td>{props.user}</td>
        <td>{dateFormat(props.created_at)}</td>
        <td>{dateFormat(props.updated_at)}</td>
    </tr>
)

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