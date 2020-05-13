import React, { useState, useEffect } from 'react'
import InputSize from './InputSize'
import { Card } from 'reactstrap'

const CardChart = props => {
    const [width, setWidth] = useState(730)
    const [height, setHeight] = useState(250)
    const { RenderChildren, name }  = props
    useEffect( () => {
        const widthLocalStorage = window.localStorage.getItem(`${name}_width`)
        if (widthLocalStorage) {
            setWidth(parseInt(widthLocalStorage, 10))
        }
        const heightLocalStorage = window.localStorage.getItem(`${name}_height`)
        if (heightLocalStorage) {
            setWidth(parseInt(heightLocalStorage, 10))
        }
    }, [])
    return (
        <>
            {/* <Card> */}
                {props.rows !== undefined && <RenderChildren width={width} height={height} {...props}/>}
            {/* </Card> */}
            <InputSize 
                setwidth={setWidth}
                name={name}
                setheight={setHeight}
                width={width}
                height={height}
            />
        </>
    )
}

export default CardChart