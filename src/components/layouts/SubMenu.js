import React, { useState } from 'react'
import  { NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SubMenu = props => {
    let location = useLocation()
    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => setCollapsed(!collapsed)
    const { name, items } = props
    
    return (
        <>
            <NavItem onClick={toggleNavbar} >
                <NavLink className='dropdown-toggle'>
                {name}
                </NavLink>
            </NavItem>
            {items.map((item, index) => {
                const path = `/${name.toLowerCase()}/${item.toLowerCase()}`
                return (
                    <Link key={item} to={path+ `?project=${props.project}`}>
                        <NavItem active={`/${name.toLowerCase()}/${item.toLowerCase()}` === location.pathname} className='pl-4'>{item}</NavItem>
                    </Link>
            )})}
            
        </>
    )
}

export default SubMenu
