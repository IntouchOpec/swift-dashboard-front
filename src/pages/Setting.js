import React from 'react'
import { Card } from 'reactstrap'

const SettingPage = props =>{
    return (
        <div className='mt-4'>
            <div className='row justify-content-between'>
                <div className='d-flex'>
                    <h2 className='h3'>Setting Project</h2>
                </div>
            </div>
            <hr />
            <Card>
                {/* <UserForm sumitForm={sumitForm} errors={errors}/> */}
            </Card>
        </div>
    )
}

export default SettingPage