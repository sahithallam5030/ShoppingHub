import React,{ useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { FaBars,FaRegUserCircle } from "react-icons/fa";
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
      <div className="headers ">
          <Navbar expand="lg" className="navbar">
      <button onClick={handleShow} className='menu-btn'>
        <FaBars/>Menu
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h5><span><FaRegUserCircle/></span>Hello,
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
     
        <Navbar.Brand href="/" className='text-light'>ShoppingHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='text-light' >Home</Nav.Link>
              {
            (userSuccess===false) ?<>
            <Nav.Link href="/signup" className='text-light'>Register</Nav.Link>
            <Nav.Link href="/login" className='text-light'>Login</Nav.Link>
            </>: 
              <>
              <Nav.Link href="/cart" className='text-light'>Cart</Nav.Link>
              <Nav.Link href="/wishlist" className='text-light'>Wishlist</Nav.Link>
            
              {
                userObject.usertype==='admin' && <Nav.Link href="/admin" className='text-light'>Admin</Nav.Link>
              }
              <Nav.Link href="/profile" className='text-light'>{userObject.username}</Nav.Link>
              <Nav.Link onClick={userLogout} className='text-light'>
                Sign out
              </Nav.Link>
              
            
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
