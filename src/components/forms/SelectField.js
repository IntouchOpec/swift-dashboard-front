import React from 'react'
import Select from 'react-select'

const customStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: '0px',
    }),
    valueContainer: (base, state) => ({...base, margin: '4px'})
}

const SelectField = props => {
    const { value, onChange ,name ,options ,placeholder } = props
    return (
        <Select 
            {...props}
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