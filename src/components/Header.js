import React from 'react'
import {Link} from 'react-router-dom'
import { FaBars,FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useSelector,useDispatch} from 'react-redux'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { clearLoginStatus } from '../slices/userSlice';


function Header() {
  let {userObject,userSuccess}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogout=()=>{
    dispatch(clearLoginStatus());
  }
  return (
    <div>
      <div className="headers bg-body-tertiary">
          <Navbar expand="lg" className="bg-body-tertiary mx-4">
      <button onClick={handleShow} className='me-5'>
        <FaBars/>Menu
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h5><span><FaUserCircle/></span>Hello,
          {
            userSuccess===true ? <>{userObject.username}</> : <Link to='/login' className='nav-link d-inline'>Sign in</Link>
          }</h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        </Offcanvas.Body>
      </Offcanvas>
     
        <Navbar.Brand href="/">ShoppingHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {
            (userSuccess===false) ?<>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </>: 
              <>
            <NavDropdown title={userObject.username} id="basic-nav-dropdown">
              <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              {
                userObject.usertype==='admin' && <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
              }
              <NavDropdown.Item onClick={userLogout}>
                Signout
              </NavDropdown.Item>
              
            </NavDropdown>
              </>
}
          </Nav>
        </Navbar.Collapse>
     
    </Navbar>
      </div>
    </div>
  )
}

export default Header
