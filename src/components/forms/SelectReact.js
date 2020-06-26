import React, {useEffect} from 'react'
import Select from 'react-select'

const customStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: '0px',
    }),
    valueContainer: (base, state) => ({...base, margin: '4px'})
}

const SelectField = props => {
    const { value, onChange ,name ,options ,placeholder, label } = props

    return (
        <Select 
            {...props}
            inputProps={`${name}-${label}`}
            onChange={onChange}
            value={value}
            styles={customStyles}
            name={name}
            options={options}
            placeholder={placeholder}
        />
    )
}

export default SelectField
