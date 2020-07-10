import React, { useEffect, useState } from 'react'
import client from 'utils/client'
import { CamerasURL } from 'utils/endpoint'
import { Card, Button } from 'reactstrap'
const CamerasPage = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        client.get(`${CamerasURL}`)
            .then(res => {
                console.log(res.data)
                setData(res.data.result)
            })
        // .catch(err => {
        //     setData(state => state)
        // })
    }, [])

    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <div>
                        <h2 className='h3 col-2'>Cameras</h2>
                    </div>
                </div>
            </div>
            <hr />
            <div className='row'>
                <div className='col-6'>
                    <img className='img-fluid' src="http://103.30.127.4:8000/api/v1/video-camera/" />
                </div>
                <div className='col-6'>
                    <Card className='h-100 w-100' >
                        <Button>+</Button>
                    </Card>
                </div>
                <div className='col-6'>
                    <Card className='h-100 w-100' >
                        <img className='img-fluid' src="http://103.30.127.4:8000/api/v1/video-camera/" />
                    </Card>
                </div>
                <div className='col-6'>
                    <Card className='h-100 w-100' >
                        <Button>+</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CamerasPage