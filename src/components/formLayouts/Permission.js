import React, { useState, useEffect } from 'react'
import InputField from 'components/forms/InputField'
import { useForm } from 'react-hook-form'
import { Button, Table, FormGroup, Input, Label } from 'reactstrap'
import SelectField from 'components/forms/SelectField'
import client from 'utils/client'
import { PermissionURL } from 'utils/endpoint'

const PermissionForm = props => {
    const [data, setData] = useState([])
    const { defaultValues } = props
    console.log(defaultValues)
    const { handleSubmit, errors, register, setValue, setError, reset } = useForm({ defaultValues })
    const [permissions, setPermission] = useState([])

    useEffect(() => {
        client.get(PermissionURL).then(res => {
            setData(res.data)
        })
        setPermission(defaultValues.permissions.map(permission => permission.id))
    }, [])

    useEffect(() => {
        Object.keys(props.errors).map(key => {
            setError(key, key, props.errors[key][0])
        })
    }, [props.errors])

    const onClick = id => {
        setPermission(state => {
            let isFilter = false
            let perms = state.filter(value => {
                if (id === value) {
                    isFilter = true
                    return true
                }
                return false
            })
            
            if (isFilter) {
                return perms
            }
            return [...state, id]
        })
    }

    return (
        <form onSubmit={handleSubmit(data => props.submitForm({ name: data.name, permissions }))} className='d-flex p-3'>
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
                                        <Input onClick={() => onClick(permission.id)} type="checkbox" 
                                        checked={!!defaultValues.permissions.find(value => value.name === permission.name)} 
                                        name="check" id={permission.codename} />
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
