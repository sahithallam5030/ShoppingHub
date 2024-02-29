import React,{ useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { FaBars,FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useSelector,useDispatch} from 'react-redux'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { clearLoginStatus } from '../slices/userSlice';


function Header() {
  let {userObject,userSuccess}=useSelector(state=>state.users);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogout=()=>{
    dispatch(clearLoginStatus());
  }
  const navigation=(data)=>{
    navigate(`/${data}`);
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
          <div className='offcanvas-link' onClick={()=>navigation('mobiles')}>
          <Link className='nav-link'>Mobiles</Link>
          <IoIosArrowForward />
          </div>
          <div className='offcanvas-link' onClick={()=>navigation('tvs')}>
          <Link className='nav-link'>Telivision</Link>
          <IoIosArrowForward />
          </div>
          <div className='offcanvas-link' onClick={()=>navigation('laptops')}>
          <Link className='nav-link'>Laptops</Link>
          <IoIosArrowForward />
          </div>
          <div className='offcanvas-link' onClick={()=>navigation('books')}>
          <Link className='nav-link'>Books</Link>
          <IoIosArrowForward />
          </div>
          <div className='offcanvas-link' onClick={()=>navigation('shoes')}>
          <Link className='nav-link'>Shoes</Link>
          <IoIosArrowForward />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
     
        <Navbar.Brand href="/">ShoppingHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
              {
            (userSuccess===false) ?<>
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
