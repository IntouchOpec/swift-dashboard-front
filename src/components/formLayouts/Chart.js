import React, { useState, useEffect } from 'react'
import readXlsxFile from 'read-excel-file'
import { Button, FormGroup, Label, FormFeedback } from 'reactstrap'
import { useForm, FormContext } from 'react-hook-form'
import { DatePickerField } from 'components/forms/DatePickerField'
import SelectField from 'components/forms/SelectField'
import BaseChart from 'components/charts/BaseChart'
import SCurve from 'components/charts/SCurve'
import ManpowerPlan from 'components/charts/ManpowerPlan'
import TextareaField from 'components/forms/TextareaField'
import InputField from 'components/forms/InputField'

const reportTypeOptions = [
    { id: 0, name: 'S-Curve' },
    { id: 1, name: 'Manpower Plan' },
    // { id: 2, name: 'Overview'},

]

const ChartForm = props => {
    const [excel, setExcel] = useState([])
    const methods = useForm()
    const [select, setSelect] = useState({ reValidateMode: 'onChange', })
    const { unregister, handleSubmit, errors, register, setValue, setError, control, reset, getValues } = methods

    useEffect(() => {
        register('file')
        register('source')
    }, [])

    const onChangeFile = event => {
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onloadend = () => {
                const base64data = reader.result
                setValue('file', base64data)
            }
        })
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
                            setError={setError}
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
                        <SelectField innerRef={register({ required: 'Required', })} error={errors['report_type']} onChange={onChangeSelect} name='report_type' label='type' options={reportTypeOptions} />
                    </div>
                    {select !== '2' && <div className='col-6'>
                        <FormGroup className='p-0 m-0'>
                            <div><Label htmlFor={`file`}>file</Label></div>
                            <input name='file' ref={register({ required: 'Required', })} type='file' onChange={onChangeFile} />
                            {errors['file'] !== undefined && <div style={{ width: '100%', marginTop: '.25rem', fontSize: '80%', color: '#dc3545' }}>{errors['file'].message}</div>}
                        </FormGroup>
                    </div>}
                    <div className='col-12'>
                        <TextareaField label='description' name='description' error={errors['description']} register={register({})} />
                    </div>

                    {select === '0' &&
                        <div className='col-12'><BaseChart mode={'form'} rows={excel} setValue={setValue} RenderChildren={SCurve} name='SCurve' /></div>}
                    {select === '1' &&
                        <div className='col-12'><BaseChart mode={'form'} RenderChildren={ManpowerPlan} setValue={setValue} rows={excel} name='ManpowerPlan' /></div>}
                    {/* { select === '2' &&
                            <OverviewForm register={register} name='source' errors={errors['source']} />} */}
                </div>

                <div>
                    <Button type='submit' className='ml-auto mr-3 mt-3' color='primary'>Create</Button>
                </div>
            </form>
        </FormContext>
    )
}


const pattern = {
    value: /[0-9]/i,
    message: 'invalid'
}
const OverviewForm = props => {
    const { register, name, errors } = props
    let source = {}
    if (errors[name]) {

    }
    return (
        <div className='row'>
            <div className='col-6'>
                <InputField type='text' label='license & Permit plan value' name={`${name}.license.planValue`} error={source[`license.planValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='act value' name={`${name}.license.actValue`} error={source[`license.actValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='Engineering plan value' name={`${name}.engineering.planValue`} error={source[`engineering.planValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='act value' name={`${name}.engineering.actValue`} error={source[`engineering.actValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='Procuement plan value' name={`${name}.procuement.planValue`} error={source[`procuement.planValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='act value' name={`${name}.procuement.actValue`} error={source[`procuement.actValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='Delivery plan value' name={`${name}.delivery.planValue`} error={source[`delivery.planValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='act value' name={`${name}.delivery.actValue`} error={source[`delivery.actValue`]} register={register({ required: 'Required', })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='Civil Work plan value' name={`${name}.civil_work.planValue`} error={source[`civil_work.planValue`]} register={register({ required: 'Required', pattern })} />
            </div>
            <div className='col-6'>
                <InputField type='text' label='act value' name={`${name}.civil_work.actValue`} error={source[`civil_work.actValue`]} register={register({ required: 'Required', pattern })} />
            </div>
        </div>
    )
}

export default ChartForm