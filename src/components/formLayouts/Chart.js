import React from 'react'
import { useForm, FormContext, useFormContext } from 'react-hook-form'
import { DatePickerField } from 'components/forms/DatePickerField'
import SelectField from 'components/forms/SelectField'

const reportTypeOptions = [
    {value: 0, label: 'S-Curve'},
    {value: 0, label: 'Manpower Plan'},
]

const ChartForm = props => {
    const methods = useForm()
    const [select, setSelect] = useState({})
    const {unregister, handleSubmit, errors, register, setValue, control, reset, getValues} = methods
    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(props.submitForm)} >
                <div className='row'>
                    <div className='col-6'>
                        <DatePickerField
                            register={register}
                            setValue={setValue}
                            name={'day'}
                            value={getValues('day')}
                            label={'day'}
                            placeholderText='day'
                            error={errors['day']} 
                        />
                    </div>
                    <div className='col-6'>
                        <SelectField setSelect={(e) => setSelect(e.target.value)} value={select} name='report_type' label='type' options={reportTypeOptions}/>
                    </div>
                </div>
            </form>
            </FormContext>
        )
}

export default ChartForm