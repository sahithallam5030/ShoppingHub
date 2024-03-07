import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {NavLink,Outlet,useNavigate} from 'react-router-dom'
import './CSS/Profile.css'
import {useForm} from 'react-hook-form'
import { FaUserCircle} from "react-icons/fa";
import { updateEmail,updateNumber } from '../slices/userSlice';
import Header from './Header'
import axios from 'axios'

function Profile() {
  const {userObject,userSuccess}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  const [email,setEmail]=useState(true);
  const [mobile,setMobile]=useState(true);
  const {register,handleSubmit}=useForm();
  const onEmailSubmit=async(data)=>{
    let newdata={username:userObject.username,email:data.email}
    let response=await axios.put('/users/update-mail',newdata);
    let payload=response.data;
    if(payload.message==="Data Updated Successfully"){
      dispatch(updateEmail(data.email))
    }
  }
  const onMobileSubmit=async(data)=>{
    let newdata={username:userObject.username,mobile:data.mobile}
    let response=await axios.put('/users/update-number',newdata);
    let payload=response.data;
    if(payload.message==="Data Updated Successfully"){
      dispatch(updateNumber(data.email))
    }
  }
  const handleEmail=()=>{
    setEmail(!email);
  }
  const handleMobile=()=>{
    setMobile(!mobile);
  }
  return (
    <>
    <Header/>
    <div>
      {
        userSuccess===true && 
      
      <div className="outer-profile">
        <div className="inner-profile-item">
            <div className="inner-profile-name">
              <div className="user"><FaUserCircle/></div>
              <div id='user-name'>
                <p>Hello {userObject.firstname} {userObject.lastname}</p>
              </div>
            </div>
            <div className="inner-profile-desc">
              <NavLink className='nav-link' to='/cart'>Cart</NavLink>
              <NavLink className='nav-link' to='/wishlist'>WishList</NavLink>
              <NavLink className='nav-link' to='orders'>Order History</NavLink>
            </div>
        </div>
        <div className="profile-content">
          <div className="input-profile">
            <label htmlFor='name'>Personal Information</label>
            <div className="name">
            <input type="text" className='form-control input-profile-field' value={userObject.firstname} disabled />
            <input type="text" className='form-control input-profile-field' value={userObject.lastname} disabled />
            </div>
          </div>
            <div className="input-profile">
            <label htmlFor="username" className='form-label'>Your Username</label>
            <input type="text" className='form-control input-profile-field' id='username' value={userObject.username} disabled/>
            </div>
            <div className="input-profile">
              <label htmlFor="email" className='form-label'>E-mail</label><button type="button" onClick={handleEmail} className='edit-btn'>{email===true ? <p>Edit</p> : <p>Cancel</p>}</button>
              {
                email===true && <input type="email" value={email===true && userObject.email} className='form-control' disabled={email} />
              }
              <form onSubmit={handleSubmit(onEmailSubmit)}>
              {
                email===false && <><input type="email" name="email" id="email" className='form-control' {...register('email')}/><button type='submit' className='save-btn'>Save</button></>
              }
               </form>
               </div>
               <div className="input-profile">
                <label htmlFor="mobile">Mobile Number</label><button type="button" onClick={handleMobile} className='edit-btn'>{mobile===true ? <p>Edit</p> : <p>Cancel</p>}</button>
                {
                  mobile===true && <input type="text" value={mobile===true && userObject.mobile} className='form-control' disabled={mobile} />
                }
              <form onSubmit={handleSubmit(onMobileSubmit)}>
              {
                mobile===false && <><input type="text" name="mobile" id="mobile" className='form-control' {...register('mobile')}/><button type='submit' className='save-btn'>Save</button></>
              }
              </form>
               </div>
        </div>
      </div>
}
<Outlet/>
    </div>
    </>
  )
}

export default Profile
