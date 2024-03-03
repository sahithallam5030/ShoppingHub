import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { incrementCount,decrementCount,deleteItem } from '../slices/userSlice';
import { FaTrashCan } from "react-icons/fa6";

function Cart() {
  const {userObject,userSuccess}=useSelector(state=>state.users);
  const cart=userObject.cart;
  const dispatch=useDispatch();
  const deleteItemFromCart=(data)=>{
    dispatch(deleteItem(data));
  }
  const decrement=(data)=>{
    if(data.count===0){
      deleteItemFromCart(data);
    }
    dispatch(decrementCount(data));
  }
  const increment=(data)=>{
    dispatch(incrementCount(data));
  }
  return (
    <div>
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
        <div className='outer-cart'>
        {
            cart.map((item,index)=><div className='inner-cart' key={index}>
              <div className="index">
                <p>{index+1}</p>
              </div>
              <div className="cart-image">
                <img src={item.productimage[0]} alt="" />
              </div>
              <div className="cart-desc">
                <h4>{item.productname}</h4>
                <h5><FaRupeeSign />{item.productprice}</h5>
                <p className='text-decoration-line-through text-secondary'><FaRupeeSign />{Math.floor((item.productprice)*1.1)}</p>
                <div className="cart-btn">
                  <button type="button" className='btn' onClick={()=>decrement(item)}>-</button>
                  <p>{item.count}</p>
                  <button type="button" className='btn' onClick={()=>increment(item)}>+</button>
                  <button type="button" className='mx-4 border-0' onClick={()=>deleteItemFromCart(item)}><FaTrashCan /></button>
                </div>
              </div>
            </div>)
        }
        </div>
      }
    </div>
  )
}

export default Cart
