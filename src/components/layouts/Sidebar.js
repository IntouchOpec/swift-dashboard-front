import React from 'react'
import { NavItem, NavLink, Nav } from 'reactstrap'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { AuthContext } from 'providers'

const menus = [
    { admin: false, path: '/', name: 'Overview' },
    { admin: false, path: '/s_curve', name: 'S-Curve' },
    { admin: false, path: '/manpower_plan', name: 'Manpower Plan' },
    { admin: false, path: '/timesheet', name: 'Timesheets' },
    // { path: '/manpower_cost',name: 'Manpower Cost' },
    // { path: '/camera',name: 'Camera' },
    // { path: '/ai_camera',name: 'AI Camera' },
    // { path: '/iot',name: 'IoT' },
    // { path: '/document_mgn',name: 'Document Mgn.' },
    // { path: '/procurement_mgn',name: 'Procurement Mgn.' },
    // { path: '/contract_mgn',name: 'Contract Mgn.' },
    // { path: '/change_mgn',name: 'Change Mgn.' },
    { admin: true, path: '/users', name: 'Users' },
    { admin: true, path: '/jobs', name: 'Job' },
    { admin: true, path: '/charts', name: 'Charts' },
    // { path: '/setting', name: 'Setting' },
]

const ListMenu = (props, user) => {
    const admin = user.role === 'admin'
    if (user.is_superuser || admin) {
        return menus.map(menu => {
            return (
                     <NavItem key={menu.path} className='my-2'>
                        <NavLink tag={Link} to={menu.path}>
                            {menu.name}
                        </NavLink>
                    </NavItem>
            )
        })
    }
    return menus.filter(menu => admin === menu.admin).map(menu => {
        return (
                 <NavItem key={menu.path} className='my-2'>
                    <NavLink tag={Link} to={menu.path}>
                        {menu.name}
                    </NavLink>
                </NavItem>
        )
    })
}
const SideBar = props => {
    const { user } = props
    return (
        <div className={classNames('sidebar', { 'is-open': props.isOpen })}>
            <span color='info' onClick={props.toggle} className='close-icon'>&times;</span>
            <div className='side-menu my-4'>
                <Nav vertical className='list-unstyled pb-3 w-100'>
                    {/* <ListMenu /> */}
                    {ListMenu(props, user)}
                </Nav>
            </div>
        </div>
    )
}

export default SideBar

