import CardChart from 'components/charts/CardChart';
import moment from 'moment';
import React, { Suspense, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Card, Table } from 'reactstrap';
// import SCurve from 'components/charts/SCurve'
import client from 'utils/client';
import { reportsSearchDetailURL } from 'utils/endpoint';
import { dateFormat } from 'utils/formats';
const SCurve = React.lazy(() => import('components/charts/SCurve'))


const customStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: '0px'
    }),
    valueContainer: (base, state) => ({
        ...base,
        padding: '6px 8px'
    })
}


const SCurvePage = props => {
    const [date, setDate] = useState(new Date())
    const [data, setData] = useState({})
    const [options, setOptions] = useState([])
    const [select, setSelect] = useState({})

    useEffect(() => {
        client.get(`${reportsSearchDetailURL}?report_type=0&day=${moment(date).format('DD')}&month=${moment(date).format('MM')}&year=${moment(date).format('YYYY')}`).then(res => {
            setData(res.data[0])
            setOptions(res.data.map(option => ({ ...option, value: option.id, label: `${moment(option.day).format('YYYY-MM-DD')}-${option.user}`, })))
        })
    }, [])

    const onChange = value => {
        client.get(`${reportsSearchDetailURL}?report_type=0&day=${moment(value).format('DD')}&month=${moment(value).format('MM')}&year=${moment(value).format('YYYY')}`).then(res => {
            setData(res.data[0])
            setDate(value)
            setOptions(res.data.map(option => ({ ...option, value: option.id, label: `${moment(option.day).format('YYYY-MM-DD')}-${option.user}`, })))
        }).catch(err => {

        })
    }

    const onChangeOption = value => {
        setSelect(value)
        setData(value)
    }

    return (
        <div className='mt-4'>
            <h2 >S-Curve</h2>
            <hr />
            <div className='row'>
                <div className='col-6'>
                    <DatePicker
                        selected={date}
                        autocomplete='off'
                        onChange={onChange}
                        className={`form-control`}
                        calendarClassName='date-time__calendar'
                        dayClassName={() => 'date-time__day'}
                        popperModifiers={{
                            preventOverflow: {
                                enabled: true
                            }
                        }}
                    />
                </div>
                <div className='col-6'>
                    <Select
                        styles={customStyles}
                        onChange={onChangeOption}
                        value={select}
                        options={options}
                        placeholder={'placeholder'}
                    />
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>

                {data && <CardChart className='mt-3 card' rows={data.source} RenderChildren={SCurve} name='SCurve' />}
            </Suspense>

            <Card>
                {data && <Table striped>
                    <tbody>
                        <tr>
                            <td>created_by</td>
                            <td>{data.user}</td>
                            <td>created_at</td>
                            <td>{dateFormat(data.created_at)}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>{data.report_type === 0 ? 'S-Curve' : 'Manpower Plan'}</td>
                            <td>dowload</td>
                            <td><a href='/images/myw3schoolsimage.jpg' download>{data.path}</a></td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td colSpan='3'>{data.description && data.description.length === 0 ? '-' : data.description}</td>
                        </tr>
                    </tbody>
                </Table>}
            </Card>
        </div>
    )
}

export default SCurvePage

