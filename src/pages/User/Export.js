import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from 'utils/client'
import { timesheetReportURL } from 'utils/endpoint'
import { exportPDF } from 'components/pdf/Export'
import { styles } from 'utils/formats'
import { Table, Button } from 'reactstrap'
import { ChevronDoubleLeft } from 'react-bootstrap-icons'
// import { Document, Page } from 'react-pdf';
import SelectReact from 'components/forms/SelectReact'
import moment from 'moment'

const yearsOption = [
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
]

const monthsOption = [
    { label: moment().month(0).format("MMMM"), value: '01', day: 31 },
    { label: moment().month(1).format("MMMM"), value: '02', day: 29 },
    { label: moment().month(2).format("MMMM"), value: '03', day: 31 },
    { label: moment().month(3).format("MMMM"), value: '04', day: 30 },
    { label: moment().month(4).format("MMMM"), value: '05', day: 31 },
    { label: moment().month(5).format("MMMM"), value: '06', day: 30 },
    { label: moment().month(6).format("MMMM"), value: '07', day: 31 },
    { label: moment().month(7).format("MMMM"), value: '08', day: 31 },
    { label: moment().month(8).format("MMMM"), value: '09', day: 30 },
    { label: moment().month(9).format("MMMM"), value: '10', day: 31 },
    { label: moment().month(10).format("MMMM"), value: '11', day: 30 },
    { label: moment().month(11).format("MMMM"), value: '12', day: 31 },
]

const dateFormat = (date) => {
    return moment(date).format("MMM-DD-YYYY")
}

const UserExportPage = props => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [yearfilter, setYearFilter] = useState(yearsOption[0])
    const [monthfilter, setMonthFilter] = useState(monthsOption[parseInt(moment(Date.now()).format("M")) - 1])

    /* useEffect(() => {
        let date_after = `${yearfilter.value}-${monthfilter.value}-1`
        let date_before = `${yearfilter.value}-${monthfilter.value}-${monthfilter.day}`
        client.get(`${timesheetReportURL.replace(':id', id)}?start_data_after=${date_after}&start_data_before=${date_before}&end_date_after=${date_after}&end_date_before=${date_before}`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
                setLoading(false)
            }).catch(err => {

            })
    }, []) */
    useEffect(() => {
        console.log(moment().month(0).format("MMMM"))
        setLoading(true)
        let date_after = `${yearfilter.value}-${monthfilter.value}-1`
        let date_before = `${yearfilter.value}-${monthfilter.value}-${monthfilter.day}`
        client.get(`${timesheetReportURL.replace(':id', id)}?start_data_after=${date_after}&start_data_before=${date_before}&end_date_after=${date_after}&end_date_before=${date_before}`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
                setLoading(false)
            }).catch(err => {

            })
    }, [monthfilter, yearfilter])

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
                    {/* <PrintButton id={`user-${id}`} label={'Save PDF'} /> */}
                    {!loading && data.time_sheets.length !== 0 ?
                        <Button onClick={() => exportPDF(data, monthfilter)} className='btn btn-primary' > Save PDF </Button>
                        :
                        <Button onClick={() => exportPDF(data, monthfilter)} className='btn btn-primary' disabled > Save PDF </Button>
                    }
                </div>
                <div className='col-sm-2 col-md-2'>
                    <Link to={`/users/${id}`}><Button className=''><ChevronDoubleLeft /> กลับ </Button></Link>
                </div>
            </div>
            <hr />
            {!loading &&
                <Table bordered className='p-4'>
                    <thead>
                        <tr>
                            <th colSpan='2'>Staff Name : {data.user.fullname}</th>
                            <th>Month : {monthfilter.label}</th>
                        </tr>
                    </thead>
                    <RenderRow data={data.time_sheets} />
                    <tfoot>
                        <tr>
                            <td colSpan='2' align='center'><b>Grand Total</b></td>
                            <td align='center'>{sumallday(data.time_sheets)}</td>
                        </tr>
                    </tfoot>
                </Table>
            }
        </div>
    )
}

const RenderRow = props => {
    const { data } = props
    return data.map((jobs, jkeys) => {
        return (
            <tbody key={`Job-${jkeys}`}>
                <tr><th colSpan='3'>{jobs.job.job_type.code} : {jobs.job.name}</th></tr>
                <tr><td colSpan='2' align='center'><b>Date</b></td><td align='center'><b>Workday</b></td></tr>
                {jobs.time_sheets.map((job, jkey) => {
                    return (
                        <tr key={`${jkey}-${job.code}`}><td colSpan='2' align='center'>{`${dateFormat(job.start_date)} - ${dateFormat(job.end_date)}`}</td><td align='center'>{job.day}</td></tr>
                    )
                })}
                <tr><td colSpan='2' align='center'><b>Total</b></td><td align='center'>{sumday(jobs.time_sheets)}</td></tr>
            </tbody>
        )
    })
}

const sumday = timesheet => {
    let sum = 0
    timesheet.map((job) => {
        sum += job.day
    })
    return sum
}

const sumallday = timesheet => {
    let sum = 0
    timesheet.map((jobs) => {
        sum += sumday(jobs.time_sheets)
    })
    return sum
}

export default UserExportPage