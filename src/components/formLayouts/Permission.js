import React, { useState, useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button, Table,
    FormGroup,Input,Label } from 'reactstrap'
import SelectField from 'components/forms/SelectField'
import client from 'utils/client'
import { PermissionURL } from 'utils/endpoint'
const PermissionForm = props => {
    const [data, setData] = useState([])
    const { handleSubmit, errors, register, setValue, setError, reset } = useForm()
    useEffect(() => {
        client.get(PermissionURL).then(res => {
            setData(res.data)
        })
    }, [])
    useEffect(() => {
        Object.keys(props.errors).map(key => {
            setError(key, key, props.errors[key][0])
        })
    }, [props.errors])

    return (
        <form onSubmit={handleSubmit(props.submitForm)} className='d-flex p-3'>
            <div className='col-12 m-0 p-0'>
                <div className='d-flex'>
                    <div className='col-12'>
                        <InputField type='text' label='name' name='name' error={errors['name']} register={register({ required: 'Required' })} />
                    </div>
                </div>
                <hr />
                <Table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>add</th>
                            <th>change</th>
                            <th>delete</th>
                            <th>view</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(value => {
                            return <tr>
                                <td>
                                    {value.content_type}
                                </td>
                                {value.permissions.map(permission => <td>

                                    <FormGroup check>
                                        <Input type="checkbox" name="check" id={permission.codename} />
                                        <Label for={permission.codename} check>{permission.codename}</Label>
                                    </FormGroup>

                                </td>)}
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Button type='submit' className='ml-auto mr-3' color='primary'>Submit</Button>
            </div>
        </form>
    )
}

export default PermissionForm