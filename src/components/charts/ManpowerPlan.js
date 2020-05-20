import React, { useState, useEffect } from 'react'
import { ComposedChart, Line, BarChart, Tooltip, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import moment from 'moment'
import { getRandomColor } from 'utils'

const dataMock = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 }
]

const ManpowerPlan = props => {
  const [data, setData] = useState(dataMock)

  const [bars, setBars] = useState([])
  const { rows, setValue, mode } = props

  useEffect(() => {
    if (mode === 'form') {
      onChange(rows)
    } else {
      setBars(rows.bar)
      setData(rows.data)
    }
  }, [rows])

  const onChange = rows => {
    let resourceIDNameIndex
    let date
    let barList = []
    let values = {}
    rows.forEach((row, index) => {
      if (index === 0) {
        row.forEach((col, i) => {
          if (col === 'Resource ID Name') {
            resourceIDNameIndex = i
          }
          date = moment(col).format('YYYY-MMM-DD')
          if (date !== 'Invalid date') {
            values[i] = { name: date }
          }
        })
      } else {
        let isActivity = false
        let name = row[0]
        for (let i = 0; i < row.length; i++) {
          if (i === resourceIDNameIndex) {
            if (row[i]) {
              isActivity = true
              barList.push({ name, color: getRandomColor() })
            } else {
              break
            }
          }

          if (isActivity) {
            if (typeof row[i] === 'number') {
              values[i] = { ...values[i], [name]: row[i] }
            }
          }
        }
      }
    })
    let dataList = []
    for (const key in values) {
      let array = Object.values(values[key])
      let total = 0
      let isEmpty = false
      for (let index = 1; index < array.length; index++) {
        total = total + array[index]
        isEmpty = true
      }
      if (isEmpty) {
        dataList.push({ ...values[key], total })
      }
    }
    setBars(barList)
    setData(dataList)
    setValue('source', { bar: barList, data: dataList })
  }
  const { width, height, className } = props



  return (
    <div>

      <ComposedChart className={className} width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        {bars.map(bar => {
          return (
            <Bar
              key={bar.name}
              dataKey={bar.name}
              stackId='a'
              fill={bar.color}
            />
          )
        })}
        <Line
          dataKey='total'
          stroke='red'
          strokeWidth={2}
          dot={{ stroke: 'red', strokeWidth: 6 }}
        />
        <Legend />
        {/* <Bar dataKey='uv' stackId='a' fill='#82ca9d' /> */}
      </ComposedChart>

    </div>
  )
}


export default ManpowerPlan