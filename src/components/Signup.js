import React,{useState} from 'react'
import { FaRegUserCircle,FaEye,FaEyeSlash } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios'
import './CSS/Login.css'

function Signup() {
  let [type,setType]=useState('password')
  let [icon,setIcon]=useState(FaEye);
  const navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm();
  const togglePassword=()=>{
    if(type==='password'){
      setType('text');
      setIcon(FaEyeSlash)
    }
    else{
      setType('password');
      setIcon(FaEye);
    }
  }
  const onFormSubmit=(userdata)=>{
    console.log(userdata);
    axios.post('/users/create-user',userdata)
    .then((response)=>{
        let data=response.data.message;
        if(data==="Account Created Successfully"){
          alert(data);
          navigate('/login');
        }
    })
    .catch((error)=>console.log("Error occured",error));
  }
  return (
    <div className='outer-login-form'>
        <div className="inner-login-form">
          <h4 className='text-center'>Sign up</h4>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="username inputs">
              <div className="fname">
                <label htmlFor="fname" className='form-label'>FirstName</label>
                <input type="text" name="fname"  {...register('firstname')} className='form-control' placeholder='FirstName'/>
              </div>
              <div className="fname">
              <label htmlFor="lname" className='form-label'>LastName</label>
                <input type="text" name="lname"  {...register('lastname')} className='form-control' placeholder='LastName'/>
              </div>
            </div>
            <div className="inputs"> 
              <label htmlFor="username" className='form-label'>Username</label>
              <div className="input-fields">
                <input type="text" name="username" id="username" placeholder='Enter Username' className="input-field-item" {...register('username',{required:true})}/>
                <div className="icon"><FaRegUserCircle /></div>
              </div>
              {
                errors.username?.type==='required' && <p className="text-danger">*Please Enter Username</p>
              }
            </div>
            <div className="inputs"> 
              <label htmlFor="password" className='form-label'>Password</label>
              <div className="input-fields">
                <input type={type} name="password" id="password" placeholder='Enter password' className="input-field-item" {...register('password',{required:true})}/>
                <div className="icon p-icon" onClick={togglePassword}>{icon}</div>
              </div>
              {
                errors.username?.type==='required' && <p className="text-danger">*Please Enter Password</p>
              }
            </div>
            <div className="inputs"> 
              <label htmlFor="email" className='form-label'>Email</label>
              <div className="input-fields">
                <input type="text" name="email" id="email" placeholder='Enter email' className="input-field-item" {...register('email',{required:true})}/>
                <div className="icon"><IoMailOutline /></div>
              </div>
              {
                errors.username?.type==='required' && <p className="text-danger">*Please Enter Email</p>
              }
            </div>
            <div className="inputs"> 
              <label htmlFor="mobile" className='form-label'>Mobile</label>
              <div className="input-fields">
                <input type="text" name="mobile" id="mobile" placeholder='Enter mobile' className="input-field-item" {...register('mobile',{required:true})}/>
                <div className="icon"><MdOutlineLocalPhone /></div>
              </div>
              </div>
            <div className="inputs input-radio"> 
                <div className="input-radio-fields">
                  <input type="radio" name="usertype" id="usertype" value='user' className='form-check-input' checked {...register('usertype')}/>
                  <label htmlFor="form-check-label">User</label>
                </div>
                <div className="input-radio-fields">
                <input type="radio" name="usertype" id="usertype" value='admin' className='form-check-input' {...register('usertype')}/>
                  <label htmlFor="form-check-label">Admin</label>
                </div>
              
            </div>
            <div className="submit-btn">
              <button type="submit" className="login-btn">Create Account</button>
            </div>
            <p className='text-center'>Already have account?<Link to='/login' className='register'>Login</Link></p>
          </form>
        </div>
    </div>
  )
}

export default Signup
