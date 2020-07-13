import React, { useState } from 'react'
import { NavItem, NavLink, Nav, Collapse } from 'reactstrap'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { AuthContext } from 'providers'
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons'
const menus = [
    { admin: false, path: '/', name: 'Overview' },
    { admin: false, path: '/s_curve', name: 'S-Curve' },
    { admin: false, path: '/manpower_plan', name: 'Manpower Plan' },
    { admin: false, path: '/timesheet', name: 'Timesheet' },
    { admin: true, path: '/cameras', name: 'Camera' },
    // { path: '/manpower_cost',name: 'Manpower Cost' },
    // { path: '/camera',name: 'Camera' },
    // { path: '/ai_camera',name: 'AI Camera' },
    // { path: '/iot',name: 'IoT' },
    // { path: '/document_mgn',name: 'Document Mgn.' },
    // { path: '/procurement_mgn',name: 'Procurement Mgn.' },
    // { path: '/contract_mgn',name: 'Contract Mgn.' },
    // { path: '/change_mgn',name: 'Change Mgn.' },
    {
        admin: false, path: '/setting', name: 'Setting', subMenus: [
            { admin: false, path: '/company', name: 'Company' },
            { admin: false, path: '/job_type', name: 'Job Type' },
            { admin: true, path: '/users', name: 'User' },
            { admin: true, path: '/jobs', name: 'Job' },
            { admin: true, path: '/charts', name: 'Chart' },
            { admin: true, path: '/permissions', name: 'Permission' },
        ]
    },

    // { path: '/setting', name: 'Setting' },
]

const CollapseMenu = props => {
    const { menu } = props
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <NavItem key={menu.path} className='my-2'>
            {Array.isArray(menu.subMenus) ? <NavLink className='d-flex'> <>{menu.name}</>{
                isOpen ?
                    <ChevronDown onClick={() => setIsOpen(state => !state)} className='ml-auto mt-1' /> :
                    <ChevronRight onClick={() => setIsOpen(state => !state)} className='ml-auto mt-1' />} </NavLink> :
                <NavLink tag={Link} to={menu.path}> {menu.name} </NavLink>}
        </NavItem>
        {Array.isArray(menu.subMenus) &&
            <Collapse className='ml-1' isOpen={isOpen}>
                {menu.subMenus.map(subMenu => <NavLink tag={Link} to={subMenu.path}>
                    {subMenu.name}
                </NavLink>)}
            </Collapse>
        }
    </>
}
const ListMenu = (props, user) => {
    const admin = user.role === 'admin'
    if (user.is_superuser || admin) {
        return menus.map(menu => {
            return (<CollapseMenu menu={menu} />
                // <>
                //     <NavItem key={menu.path} className='my-2'>
                //         {Array.isArray(menu.subMenus) ? <NavLink className='d-flex'> <>{menu.name}</> <ChevronRight className='ml-auto mt-1' /> </NavLink> : <NavLink tag={Link} to={menu.path}> {menu.name} </NavLink>}
                //     </NavItem>
                //     {Array.isArray(menu.subMenus) &&
                //         <Collapse isOpen={isOpen}>
                //             {menu.subMenus.map(subMenu => <NavLink tag={Link} to={menu.subMenu}>
                //                 {subMenu.name}
                //             </NavLink>)}
                //         </Collapse>
                //     }
                // </>
            )
        })
    }
    return menus.filter(menu => admin === menu.admin).map(menu => {
        return (
            <CollapseMenu menu={menu} />
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
                    {ListMenu(props, user)}
                </Nav>
            </div>
        </div>
    )
}

export default SideBar

