import React,{useState} from 'react'
import { FaUserCircle,FaEye,FaEyeSlash } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import {Link,useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { userLogin } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';

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
          <h1 className='text-center'>Login</h1>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="inputs"> 
              <label htmlFor="username" className='form-label'>Username</label>
              <div className="input-fields">
                <input type="text" name="username" id="username" placeholder='Enter Username' className="form-control" {...register('username',{required:true})}/>
                <div className="icon"><FaUserCircle /></div>
              </div>
              {
                errors.username?.type==='required' && <p className="text-danger">*Please Enter Username</p>
              }
            </div>
            <div className="inputs"> 
              <label htmlFor="password" className='form-label'>Password</label>
              <div className="input-fields">
                <input type={type} name="password" id="password" placeholder='Enter password' className="form-control" {...register('password',{required:true})}/>
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
              <button type="submit" className="btn btn-success">Login <BsArrowBarRight /></button>
            </div>
            <p className='text-center'>Don't Have an Account?<Link to='/signup' className='nav-link'>Register</Link></p>
          </form>
        </div>
    </div>
  )
}

export default Login
