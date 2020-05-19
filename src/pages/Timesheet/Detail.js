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

const TimeSheetDetailPage = props => {
    const [data, setData] = useState({})
    const { id } = useParams()
    useEffect( () => {
        client.get(reportsDetailURL.replace(':id', id)).then(res => {
            setData(res.data)
        }) 
    }, [])

    return (
        <></>

    )
}

export default TimeSheetDetailPage