import React, { useEffect, useState } from 'react'
import client from 'utils/client'
import { CamerasURL } from 'utils/endpoint'
import { Card, Button } from 'reactstrap'
import { AuthContext } from 'providers'

const CamerasPage = props => {
    const [data, setData] = useState([])

    useEffect(() => {
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
                    <div className='container d-flex h-100'>
                        <div className='row align-self-center w-100'>
                            <div className='col-3 mx-auto text-center'>
                                <Button className="align-self-center">+</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <img className='img-fluid' src="http://103.30.127.4:8000/api/v1/video-camera/" />
                </div>
                <div className='col-6'>
                    <div className='container d-flex h-100'>
                        <div className='row align-self-center w-100'>
                            <div className='col-3 mx-auto text-center'>
                                <Button className="align-self-center">+</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CamerasPage