import React,{useState} from 'react'
import { FaRegUserCircle,FaEye,FaEyeSlash } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { userLogin } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import './CSS/Login.css'

function Login() {
  let [type,setType]=useState('password')
  let [icon,setIcon]=useState(FaEye);
  const dispatch=useDispatch();
  let {userObject}=useSelector(state=>state.users)
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
    dispatch(userLogin(userdata));
    navigate('/');
    
  }
  return (
    <div className='outer-login-form'>
        <div className="inner-login-form">
          <h3 className='text-center'>Sign in</h3>
          <form onSubmit={handleSubmit(onFormSubmit)}>
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
                errors.password?.type==='required' && <p className="text-danger">*Please Enter Password</p>
              }
            </div>
            <div className="inputs input-radio"> 
                <div className="input-radio-fields">
                  <input type="radio" name="usertype" id="" value='user' className='form-check-input' checked {...register('usertype')}/>
                  <label htmlFor="form-check-label">User</label>
                </div>
                <div className="input-radio-fields">
                <input type="radio" name="usertype" id="" value='admin' className='form-check-input' {...register('usertype')}/>
                  <label htmlFor="form-check-label">Admin</label>
                </div>
              
            </div>
            <div className="submit-btn">
              <button type="submit" className="login-btn">Log in</button>
            </div>
            <p className='text-center other'>Don't have account?<Link to='/signup' className='register'>Sign Up</Link></p>
          </form>
        </div>
    </div>
  )
}

export default Login
