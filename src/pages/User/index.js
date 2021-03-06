import React, { useEffect, useState } from 'react'
// import SCurve from 'components/user/SCurve'
import { Link } from 'react-router-dom'
import TableBase from 'components/tables/TableBase'
import client from 'utils/client'
import { isEmpty } from 'utils'
import { usersURL, usersDetailURL } from 'utils/endpoint'
import { Button } from 'reactstrap'
import { dateFormat } from 'utils/formats'
import SwitchButton from 'bootstrap-switch-button-react'
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import { AuthContext } from 'providers'
// import { Button }

const LIMIT = 10
const filterOptions = [
    { label: 'first name', value: 'first_name' },
    { label: 'first name th', value: 'first_name_th' },
    { label: 'last name', value: 'last_name' },
    { label: 'last name th', value: 'last_name_th' },
]

const persissionName = { create: 'add_user', update: 'change_user', read: 'view_user',  }

const RowRender = props => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.id])

    const onActiveHanlder = () => {
        client.patch(`${usersDetailURL.replace(':id', props.id)}`, { active: !active })
            .then(res => {
                setActive(state => !state)
            }).catch(err => {
                setActive(state => state)
            })
    }

    return (
        <tr>
            <td>
                <AuthContext.Consumer>{context => {
                    let list = []
                    if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.read)) {
                        list.push(<Link to={`/user/${props.id}`}>
                            <Button className='rounded-0 mr-1' outline color='secondary'>view</Button>
                        </Link>)
                    }
                    if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                        list.push(<Link to={`/user/${props.id}/edit`}>
                            <Button className='rounded-0' outline color='secondary'>edit</Button>
                        </Link>)
                    }
                    if (list.length === 0) {
                        return <>-</>
                    }
                    return list
                }}
                </AuthContext.Consumer>
            </td>
            <td> <AuthContext.Consumer>{context => {
                if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.update)) {
                    return <SwitchButton onChange={onActiveHanlder} checked={active} size='sm' />
                }
                return '-'
            }}
            </AuthContext.Consumer></td>
            <td>{props.username}</td>
            <td>{props.role}</td>
            <td>{props.email}</td>
            <td>{props.full_name}</td>
            <td>{props.created_by}</td>
            <td>{props.last_login ? dateFormat(props.last_login) : '-'}</td>
            <td>{dateFormat(props.created_at)}</td>
            <td>{dateFormat(props.updated_at)}</td>
        </tr>
    )
}
const KEYS = ['-', 'active', 'username', 'role', 'email', 'full name', 'created by', 'last login', 'created at', 'updated at',]

const UserPage = props => {
    const onChangeFile = event => {
        let emailList = {}
        readXlsxFile(event.target.files[0])
            .then(result => {
                let data = []
                let email
                result.map((value, index) => {
                    if (index !== 0) {
                        email = value[9]
                        if (!emailList[value[9]]) {
                            emailList[value[9]] = true
                        } else if (email) {
                            let nameParts = email.split("@")
                            email = `${nameParts[0]}_${value[4]}@${nameParts[1]}`
                            email = email.replace(/ /g, '')
                        } else {
                            email = `${value[4]}@swiftdynamics.co.th`
                            email = email.replace(/ /g, '')
                        }
                        data.push({
                            position: value[1],
                            last_name: value[6],
                            first_name: value[4],
                            last_name_th: value[3],
                            first_name_th: value[5],
                            email: email,
                            phone: value[8],
                            username: value[9],
                            prefix: value[2],
                            company_name: value[12],
                            password: '1234',
                            admin: value[13]
                        })
                    }
                })
                client.post(usersURL + '?many=True', data).then(res => {
                }).catch(err => {
                    let massage = ''
                    err.response.data.map((value, index) => {
                        if (!isEmpty(value)) {
                            for (const key in value) {
                                massage = massage + `<p>${index} : ${key} = ${value[key]} </p>`
                            }
                        }
                    })
                    Swal.fire({
                        title: `can'n create users.!`,
                        html: `
  :
                         ${massage}
            `,
                        confirmButtonText: 'Lovely!'
                    })
                    Swal.fire('error !', massage, 'error')
                        .then(result => {

                        })
                })
            })
    }
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>User</h2>
                        {/* <Button> */}
                        <input name='file' type='file' onChange={onChangeFile} />
                    </div>
                </div>
            </div>
            <hr />
            <TableBase
                persissionName={persissionName}
                keys={KEYS}
                RowRender={RowRender}
                createPath={'/users/create'}
                filterOptions={filterOptions}
                limit={LIMIT}
                url={usersURL}
            />
        </div>
    )
}

export default UserPage