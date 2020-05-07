import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";



const CustomizedLabel = props => {
    const { x, y, stroke, value } = props;

    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={15} textAnchor="middle">
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
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
            >
                {payload.value}
            </text>
        </g>
    );
}
  
const SCurve = props => {
    return  (
        <LineChart
          width={800}
          height={600}
          data={this.props.data}
          margin={{ top: 20,right: 30,left: 20,bottom: 10 }}
        >
          <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="act"
            stroke="red"
            strokeWidth={3}
            dot={{ stroke: "red", strokeWidth: 3 }}
            label={<CustomizedLabel />}
          />
          <Line
            type="monotone"
            dataKey="plan"
            stroke="blue"
            strokeWidth={3}
            dot={{ stroke: "blue", strokeWidth: 3 }}
            label={<CustomizedLabel />}
          />
        </LineChart>
      )
}

export default SCurve