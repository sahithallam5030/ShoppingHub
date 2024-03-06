import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import './CSS/Order.css'

function Order() {
    const {userObject,userSuccess}=useSelector(state=>state.users);
    const orders=userObject.orders;
  return (
    <div id='orders'>
      {
        userSuccess===false && <>
        <h1>Please Login to View your orders</h1>
        <button><Link to='/login' className='nav-link'>Login</Link></button>
        </>
}
{
    (userSuccess===true && orders.length===0) && <h4 className='text-center my-5'>You have not ordered yet</h4>
}
{
    (userSuccess===true && orders.length!==0) && 

        <div id='outer-orders'>
        {
            orders.map((item,index)=><div className='inner-orders' key={index}>
              <div className="index">
                <p>{index+1}</p>
              </div>
              <div className="orders-image">
                <img src={item.productimage[0]} alt="" />
              </div>
              <div className="orders-desc">
                <p className='productname'>{item.productname}</p>
                <div className="price">
                <p className='productprice'><FaRupeeSign />{item.productprice}</p>
                <p className='text-decoration-line-through text-secondary productprice-2'><FaRupeeSign />{Math.floor((item.productprice)*1.1)}</p>
                </div>
                <p>Ordered Date: {item.orderdate}</p>
              </div>
            </div>)
        }
        </div>
      }
    </div>
  )
}

export default Order
