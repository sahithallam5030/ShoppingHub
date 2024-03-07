import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { incrementCount,decrementCount,deleteItemFromCart, savecount ,orders } from '../slices/userSlice';
import './CSS/Cart.css'
import { FaTrashCan } from "react-icons/fa6";
import emailjs from '@emailjs/browser'
import Header from './Header';

function Cart() {
  const {userObject,userSuccess}=useSelector(state=>state.users);
  let cart=userObject.cart;
  const dispatch=useDispatch();
  const deleteFromCart=(data)=>{
    dispatch(deleteItemFromCart({username:userObject.username,payload:data}));
  }
  const decrement=(data)=>{
    if(data.count===0){
      deleteFromCart(data);
    }
    dispatch(decrementCount(data));
  }
  const sendEmail=()=>{
    const date=new Date();
    dispatch(orders({username:userObject.username,order:userObject.cart}))
    const ordernum=`${date.getDate()}${date.getMonth()+1}${date.getTime()}`
    const name=userObject.firstname.concat(" ",userObject.lastname);
    const template={
      from_name:'Shopping Hub',
      to_name:name,
      to_email:userObject.email,
      message:`Order No:${ordernum}  is confirmed and Expected Delivery within 5 days `
    }
    emailjs.send('service_fzaya7r','template_8qxmnpq',template,{
      publicKey: 'tanw-cRAeF-SP8Vwp',
    })
    .then(()=>{
      alert('Order Confirmed');
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const increment=(data)=>{
    dispatch(incrementCount(data));
  }
  const saveQuantity=(data)=>{
    dispatch(savecount({username:userObject.username,payload:data}));
  }
  let sum=cart.reduce((accumulator,curr)=>{
    return accumulator+(Number(curr.productprice)*Number(curr.count));
  },0)
  return (
    <div>
      <Header/>
      {
        userSuccess===false && <>
        <h1>Please Login to View your Cart</h1>
        <button><Link to='/login' className='nav-link'>Login</Link></button>
        </>
}
{
    (userSuccess===true && cart.length===0) && <h4 className='text-center my-5'>Cart is Empty</h4>
}
{
    (userSuccess===true && cart.length!==0) && 
    <div id="cart">
        <div id='outer-cart'>
        {
          cart.map((item,index)=><div className='inner-cart' key={index}>
              <div className="index">
                <p>{index+1}</p>
              </div>
              <div className="cart-image">
                <img src={item.productimage[0]} alt="" />
              </div>
              <div className="cart-desc">
                <p className='productname'>{item.productname}</p>
                <div className="price">

                <p className='productprice'><FaRupeeSign />{item.productprice}</p>
                <p className='text-decoration-line-through text-secondary productprice-2'><FaRupeeSign />{Math.floor((item.productprice)*1.1)}</p>
                </div>
                <div className="cart-btn">
                  <div className="count">

                  <button type="button" className='count-btn' onClick={()=>decrement(item)}>-</button>
                  <p>{item.count}</p>
                  <button type="button" className='count-btn' onClick={()=>increment(item)}>+</button>
                  </div>
                  <div className="other-btn">
                  <button type="button" className="savecart-btn" onClick={()=>saveQuantity(item)}>Save Quantity</button>
                  <button type="button" className='removecart-btn' onClick={()=>deleteFromCart(item)}>Remove <FaTrashCan /></button>
                  </div>
                </div>
              </div>
            </div>)
        }
        </div>
        <div id="cart-total">
            <p className='sum'>Total Cart Value: <FaRupeeSign/>{sum}</p>
            <button type="button" className='btn btn-success' onClick={sendEmail}>Order Now</button>
        </div>
        </div>
      }
    </div>
  )
}

export default Cart
