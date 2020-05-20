import React, { useState } from 'react'
import { HouseFill, GearFill, BellFill, Justify } from 'react-bootstrap-icons'
import { AuthContext }  from 'providers'
import { Link } from 'react-router-dom'
import { AUTH_UNAUTHENTICATED } from 'utils'
import { Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const TopBarHeader = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const history = useHistory()

  return (
    <AuthContext.Consumer>{context => {
        const onClickLogout = () => {
          localStorage.removeItem('user')
          context.dispatch({type: AUTH_UNAUTHENTICATED })
          history.push('/')
        }

        return <Navbar className='bg-blue' expand='md'>
                <div onClick={props.toggle} className='text-white'>CMDASHBOARD</div>
                <Nav className='mr-auto p' navbar />
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className='avatar'>
                  <span className='text-uppercase'>{props.user.first_name[0]}{props.user.last_name[0]}</span>
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={onClickLogout}>logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Navbar>
      }}
      </AuthContext.Consumer>
    )
}

export default TopBarHeader
