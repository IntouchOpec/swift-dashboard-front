import React from 'react'

const InputSize = props => {
    const {width, height, setwidth, setheight, name} = props 
    
    const setWidth = e => {
        window.localStorage.setItem(`${name}_width`, e.target.value)        
        setwidth(parseInt(e.target.value, 10))
    }

    const setHeight = e => {
        window.localStorage.setItem(`${name}_height`, e.target.value)        
        setheight(parseInt(e.target.value, 10))
    }

    return (
        <>
            <div>
                <input
                    onChange={setWidth}
                    type='range'
                    name='volume'
                    value={width}
                    min='0'
                    max='1800'
                />
                <label htmlFor='volume'>width</label>
            </div>

            <div>
                <input
                    onChange={setHeight}
                    type='range'
                    name='cowbell'
                    min='0'
                    max='1000'
                    value={height}
                    step='100'
                />
                <label htmlFor='cowbell'>height</label>
            </div>
      </>
    )
}

export default InputSize