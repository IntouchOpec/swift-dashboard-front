import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap'
import { reportsURL } from 'utils/endpoint'
import ChartForm from 'components/formLayouts/Chart'
import Swal from 'sweetalert2'
import client from 'utils/client'

const CreateChartPage = props => {
    const submitForm = (data, e) => {
        console.log(data)
        client.post(reportsURL, data)
        .then(res => {
            
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
            <Card className='p-3'>
                <ChartForm submitForm={submitForm}/>
            </Card>
        </div>
    )
}

export default CreateChartPage
