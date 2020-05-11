import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingTable = props => {
    const {countRow, colSpan} = props
    const componentRender = []
    for (let index = 0; index < countRow; index++) {
        componentRender.push(
        <tr key={index}>
            <td colSpan={colSpan}><Skeleton count={1}/></td>
        </tr>)
    }
    return componentRender
}

export default LoadingTable