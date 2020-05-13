import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import moment from 'moment'
const CustomizedLabel = props => {
  const { x, y, stroke, value } = props

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={15} textAnchor='middle'>
      {value}
    </text>
  )
}

const CustomizedAxisTick = props => {
  const { x, y, stroke, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-35)'
      >
        {payload.value}
      </text>
    </g>
  )
}

const SCurve = props => {
  const { rows, setValue, mode } = props
  const [data, setData] = useState([])

  useEffect(() => {
    if (mode === 'form') {
      onChagne(rows)
    }
  }, [rows])

  const onChagne = rows => {
    if (rows.length === 0) {
      return
    }
    let datas = []
    let keys = []
    let budgetedTotalCost = 0
    let dateAct = ""
    for (let index = 1 ;index < rows.length; index++) {
      let d = {}
      d.data = {}
      for (const key in rows[index]) {
        let name = rows[0][key]
        if (Object.prototype.toString.call(name) === "[object Date]") {
          keys.push({ key, name })
          name = moment(name).format("YYYY-MMM-DD")
          if (dateAct === rows[index][key] && index === 1) {
            continue
          }
          d.data[name] = (rows[index][key] / budgetedTotalCost) * 100
          dateAct = rows[index][key]
        } else {
          d[name] = rows[index][key]
          if ("Budgeted Total Cost" === name) {
            budgetedTotalCost = rows[index][key]
          }
        }
      }
      datas = [d, ...datas]
    }

    let displayData = []
    datas.map((i, index) => {
      let a = 0
      for (const key in i.data) {
        if (index === 0) {
          displayData[a] = {}
          displayData[a].name = key
        }
        if (index === 0) {
          if (displayData[a]) {
            displayData[a].plan = Math.floor(i.data[key])
          }
        } else {
          if (displayData[a]) {
            displayData[a].act = Math.floor(i.data[key])
          }
        }
        a++
      }
    })
    setData(displayData)
    setValue('source', displayData)
  }

  const { width,height, className } = props
  
  return (
    <LineChart
      width={width}
      height={height}
      className={className}
      data={mode === 'form' ? data : rows}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <XAxis dataKey='name' height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='act'
        stroke='red'
        strokeWidth={3}
        dot={{ stroke: 'red', strokeWidth: 3 }}
        label={<CustomizedLabel />}
      />
      <Line
        type='monotone'
        dataKey='plan'
        stroke='blue'
        strokeWidth={3}
        dot={{ stroke: 'blue', strokeWidth: 3 }}
        label={<CustomizedLabel />}
      />
    </LineChart>
  )
}

export default SCurve