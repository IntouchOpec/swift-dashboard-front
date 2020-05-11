import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap'
import ChartForm from 'components/formLayouts/Chart'
import Swal from 'sweetalert2'
import client from 'utils/client'

const CreateChartPage = props => {
    const submitForm = (data, e) => {
        client.post(data)
        .then(res => {

        })
        .catch(err => {

        })
    }
    return (
        <div className='mt-4'>
            <Card className='p-3'>
                <ChartForm submitForm={submitForm}/>
            </Card>
        </div>
    )
}

export default CreateChartPage
