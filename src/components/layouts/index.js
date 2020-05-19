import React,{ useState, useEffect } from 'react'
import TopBarHeader from 'components/layouts/TopBarHeader'
import SideBar from 'components/layouts/Sidebar' 
import classNames from 'classnames'
import { Container, Card, Table, Col } from 'reactstrap'

const Layout = props => {
    const [isOpen, setOpen] = useState(false)
    const { user } = props
    const toggle = () => {
        window.localStorage.setItem('side_bar', !isOpen)
        setOpen(!isOpen)
    }
    useEffect( () => {
        const open = window.localStorage.getItem('side_bar')
        if (open === 'false') {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [])
    return (
            <>
                <TopBarHeader user={user} isOpen={isOpen} toggle={toggle}/>
                <div className='App wrapper position-relative'>
                    
                    <SideBar user={user} toggle={toggle} isOpen={isOpen}/>
                    <Container fluid className={classNames('overflow-auto content', {'is-open': isOpen})}>  
                        {props.children}
                    </Container>
                </div>
            </>
    )
}

export default Layout