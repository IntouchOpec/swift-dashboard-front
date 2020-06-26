import React, { useState, useEffect } from 'react'
import TimeSheetForm from 'components/formLayouts/TimeSheet'
import client from 'utils/client'
import { timeSheetURL, usersURL, jobsURL, jobTypesURL } from 'utils/endpoint'
import { useHistory } from 'react-router-dom'
import { Card } from 'reactstrap'
import Swal from 'sweetalert2'

const CreateTimeSheetPage = props => {
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const [jobTypes, setJobTypes] = useState([])
    const history = useHistory()

    const submitForm = data => {
        let body = []
        const userLocal = JSON.parse(window.localStorage.getItem('user'))
        data.users.map(user => {
            user.timeSheet.map(timeSheet => {
                body.push({
                    craeted_by: userLocal.id,
                    job: timeSheet.job.id,
                    job_type: timeSheet.jobTypes.id,
                    start_date: timeSheet.start_date,
                    end_date: timeSheet.end_date,
                    day: timeSheet.day,
                    staff: user.user.id
                })
            })
        })
        client.post(timeSheetURL, body)
            .then(res => {
                Swal.fire('Created !', 'Success .', 'success')
                    .then(result => history.push('/timesheet'))
            })
            .catch(err => {
                setErrors(err)
            })
    }

    useEffect(() => {
        client.get(usersURL).then(res => {
            setUsers(res.data.result.map(user => ({ ...user, value: user.id, label: user.full_name })))
        })
        client.get(jobsURL).then(res => {
            setJobs(res.data.result.map(value => ({ ...value, value: value.id, label: `${value.code}-${value.name}` })))
        })
        client.get(jobTypesURL).then(res => {
            setJobTypes(res.data.result.map(value => ({ ...value, value: value.id, label: `${value.name}` })))
        })
    }, [])

    return <div className='mt-3'>
        {jobs && <TimeSheetForm defaultValues={{}} jobTypes={jobTypes} jobs={jobs} users={users} submitForm={submitForm} errors={errors} />}
    </div>
}

export default CreateTimeSheetPage
