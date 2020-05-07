import React from 'react'

const InputSize = props => {
    const {width, height, setwidth, setheight} = props 
    
    const setWidth = e => {
        setwidth(parseInt(e.target.value, 10))
    }

    const setHeight = e => {
        setheight(parseInt(e.target.value, 10))
    }

    return (
        <>
            <div>
                <input
                    onChange={setWidth}
                    type="range"
                    name="volume"
                    value={width}
                    min="0"
                    max="1800"
                />
                <label for="volume">width</label>
            </div>

            <div>
                <input
                    onChange={setHeight}
                    type="range"
                    name="cowbell"
                    min="0"
                    max="1000"
                    value={height}
                    step="100"
                />
                <label for="cowbell">height</label>
            </div>
      </>
    )
}

export default InputSize