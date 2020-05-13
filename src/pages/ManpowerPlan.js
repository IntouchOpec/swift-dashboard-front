import React, { useState, useEffect } from 'react'
import client from 'utils/client'
import { reportsSearchDetailURL } from 'utils/endpoint'
import CardChart from 'components/charts/CardChart'
import ManpowerPlan from 'components/charts/ManpowerPlan'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Select from 'react-select'

const customStyles = {
    control: (base, state) => ({
        ...base,
    }),
}

const ManpowerCostPage = props => {
    const [date, setDate] = useState(new Date())
    const [data, setData] = useState({})
    const [options, setOptions] = useState([])
    const [select, setSelect] = useState({})

    useEffect(() => {
        client.get(`${reportsSearchDetailURL}?report_type=1&day=${moment(date).format('DD')}&month=${moment(date).format('MM')}&year=${moment(date).format('YYYY')}`).then(res => {
            setData(res.data[0])
            setOptions(res.data.map(option => ({ ...option, value: option.id, label: `${moment(option.day).format('YYYY-MM-DD')}-${option.user}`, })))
        })
    }, [])

    const onChange = value => {
        client.get(`${reportsSearchDetailURL}?report_type=1&day=${moment(value).format('DD')}&month=${moment(value).format('MM')}&year=${moment(value).format('YYYY')}`).then(res => {
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
            <h2 >Manpower Plan</h2>
            <hr />
            <div className='row'>
                <div className='col-6'>
                    <DatePicker
                        selected={date}
                        autocomplete='off'
                        onChange={onChange}
                        className={`form-control`}
                        calendarClassName="date-time__calendar"
                        dayClassName={() => "date-time__day"}
                        popperModifiers={{
                            preventOverflow: {
                                enabled: true
                            }
                        }}
                    />
                </div>
                <div className='col-6'>
                    <Select
                        onChange={onChangeOption}
                        value={select}
                        styles={customStyles}
                        options={options}
                        placeholder={'placeholder'}
                    />
                </div>
            </div>

            <CardChart rows={data.source} className='mt-3 card' RenderChildren={ManpowerPlan} name='ManpowerPlan' />
        </div>
    )
}

export default ManpowerCostPage