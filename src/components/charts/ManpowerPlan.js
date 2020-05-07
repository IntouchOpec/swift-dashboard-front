import React, { useState } from "react";
import "./styles.css";
import { ComposedChart, Line, BarChart, Tooltip, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import readXlsxFile from "read-excel-file";
import moment from "moment";
import {getRandomColor} from 'utils'

const ManpowerPlan = props => {
  const onChange = e => {
    let resourceIDNameIndex
    let date
    let barList = []
    let values = {}
    readXlsxFile(e.target.files[0]).then(rows => {
      rows.forEach((row, index) => {
        if (index === 0) {
          row.forEach((col, i) => {
            if (col === "Resource ID Name") {
              resourceIDNameIndex = i
            }
            date = moment(col).format("YYYY-MMM-DD");
            if (date !== "Invalid date") {
              values[i] = { name: date }
            }
          })
        } else {
          let isActivity = false
          let name = row[0]
          for (let i = 0; i < row.length; i++) {
            if (i === resourceIDNameIndex) {
              if (row[i]) {
                isActivity = true;
                barList.push({ name, color: getRandomColor() })
              } else {
                break
              }
            }

            if (isActivity) {
              if (typeof row[i] === "number") {
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
    //   setBars(barList)
    //   setData(dataList)
    })
  }
  const { width, height, data, bars } = props

  return (
    <div>
      <ComposedChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {bars.map(bar => {
          return (
            <Bar
              key={bar.name}
              dataKey={bar.name}
              stackId="a"
              fill={bar.color}
            />
          )
        })}
        <Line
          dataKey="total"
          stroke="red"
          strokeWidth={2}
          dot={{ stroke: "red", strokeWidth: 6 }}
        />
        <Legend />
        {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
      </ComposedChart>
      
    </div>
  )
}


export default ManpowerPlan