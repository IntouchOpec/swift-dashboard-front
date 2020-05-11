import React from 'react'
import { NavItem, NavLink, Nav } from 'reactstrap'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const menus = [
    { path: '/',name: 'Overview' },
    { path: '/s_curve',name: 'S-Curve' },
    { path: '/manpower_plan',name: 'Manpower Plan' },
    { path: '/manpower_cost',name: 'Manpower Cost' },
    { path: '/camera',name: 'Camera' },
    { path: '/ai_camera',name: 'AI Camera' },
    { path: '/iot',name: 'IoT' },
    { path: '/document_mgn',name: 'Document Mgn.' },
    { path: '/procurement_mgn',name: 'Procurement Mgn.' },
    { path: '/contract_mgn',name: 'Contract Mgn.' },
    { path: '/change_mgn',name: 'Change Mgn.' },
    { path: '/user',name: 'user' },
    { path: '/charts',name: 'chart' },
    { path: '/setting',name: 'Setting' },
]

const ListMenu = props => {
    return menus.map(menu => {
        return (<NavItem key={menu.path} className='my-2'>
                    <NavLink tag={Link} to={menu.path}>
                        {menu.name}
                    </NavLink>
                </NavItem>)
    })
}
const SideBar = props => {
    return (<div className={classNames('sidebar', {'is-open': props.isOpen})}>
            <span color='info' onClick={props.toggle} className='close-icon'>&times;</span>
            <div className='side-menu my-4'>
                <Nav vertical className='list-unstyled pb-3 w-100'>
                    <ListMenu />
                </Nav>
            </div>
        </div>)
    }

export default SideBar

