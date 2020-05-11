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
                <Link style={{ color: '#ffff' }} to='/'>CMDASHBOARD</Link>
                <Nav className='mr-auto p' navbar />
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className='avatar'>
                  <span className='text'>AB</span>
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
