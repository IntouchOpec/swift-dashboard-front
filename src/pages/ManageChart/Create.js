import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap'
import { reportsURL } from 'utils/endpoint'
import ChartForm from 'components/formLayouts/Chart'
import Swal from 'sweetalert2'
import client from 'utils/client'
import { useHistory } from 'react-router-dom'

const CreateChartPage = props => {
    const history = useHistory()

    const submitForm = (data, e) => {
        client.post(reportsURL, data)
        .then(res => {
            Swal.fire('Created !', 'Success .', 'success')
            .then(result => history.push('/charts'))
        })
        .catch(err => {

        })
    }
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    {/* <div className='col-5'> */}
                        <h2 className='h3'>Create Report</h2>
                    {/* </div> */}
                </div>
            </div>
            <hr />
            <Card className='p-5'>
                <ChartForm submitForm={submitForm}/>
            </Card>
        </div>
    )
}

export default CreateChartPage
