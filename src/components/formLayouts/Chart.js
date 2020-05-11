import React, { useState, useEffect } from 'react'
import readXlsxFile from 'read-excel-file'
import { Button } from 'reactstrap'
import { useForm, FormContext } from 'react-hook-form'
import { DatePickerField } from 'components/forms/DatePickerField'
import SelectField from 'components/forms/SelectField'
import BaseChart from 'components/charts/BaseChart'
import SCurve from 'components/charts/SCurve'
import ManpowerPlan from 'components/charts/ManpowerPlan'
import TextareaField from 'components/forms/TextareaField'

const reportTypeOptions = [
    { id: 0, name: 'S-Curve'},
    { id: 1, name: 'Manpower Plan'},
]

const ChartForm = props => {
    const [excel, setExcel] = useState([])
    const methods = useForm()
    const [select, setSelect] = useState()
    const {unregister, handleSubmit, errors, register, setValue, control, reset, getValues} = methods
    
    useEffect(() => {
        register('file')
        register('source')
    }, [])

    const onChangeFile = event => {
        setValue('file', event.target.files[0])
        readXlsxFile(event.target.files[0])
        .then(result => {
            setExcel(result)
        })
    }

    const onChangeSelect = event => {
        setSelect(event.target.value)
    }

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
                        <SelectField innerRef={register({ required: 'Required', })} onChange={onChangeSelect} name='report_type' label='type' options={reportTypeOptions}/>
                    </div>
                    <div className='col-6'>
                        <input name='file' innerRef={register({ required: 'Required', })} type="file" onChange={onChangeFile} />
                    </div>
                    <div className='col-12'>
                        <TextareaField label='description' name='description' errors={errors} register={register({})} />
                    </div>
                    <div className='col-12'>
                        { select === '0' &&
                            <BaseChart rows={excel} setValue={setValue} RenderChildren={SCurve} name='SCurve'/>}
                        { select === '1' &&
                            <BaseChart RenderChildren={ManpowerPlan} setValue={setValue} rows={excel} name='ManpowerPlan'/>}
                    </div>
                </div>
                <div className=''>
                    <Button type='submit' className='ml-auto mr-3 mt-3' color='primary'>Create</Button>
                </div>
            </form>
            </FormContext>
        )
}

export default ChartForm