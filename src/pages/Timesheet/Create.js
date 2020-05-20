import React, { useState, useEffect } from 'react'
import TimeSheetForm from 'components/formLayouts/TimeSheet'
import client from 'utils/client'
import { timeSheetURL, usersURL, jobsURL } from 'utils/endpoint'
import { useHistory } from 'react-router-dom'
import { Card } from 'reactstrap'
import Swal from 'sweetalert2'

const CreateTimeSheetPage = props => {
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const history = useHistory()

    const submitForm = data => {
        // client.post(timeSheetURL)
        //     .then(res => {
        Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/timesheet'))
        // })
        // .catch(err => {
        //     setErrors(err)
        // })
    }

    useEffect(() => {
        client.get(usersURL).then(res => {
            setUsers(res.data.result.map(user => ({ ...user, value: user.id, label: user.full_name })))
        })
        client.get(jobsURL).then(res => {
            setJobs(res.data)
        })
    }, [])

    return <div className='mt-3'>
        <h3>New TimeSheet</h3>
        <hr />
        <Card>
            <h4 className='my-4 ml-2'>List</h4>
            <TimeSheetForm defaultValues={{}} jobs={jobs} users={users} submitForm={submitForm} errors={errors} />
        </Card>
    </div>
}

export default CreateTimeSheetPage
