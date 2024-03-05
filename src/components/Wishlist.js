import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { deleteItemFromList,addItemToCart } from '../slices/userSlice';
import { FaTrashCan } from "react-icons/fa6";
import './CSS/Wishlist.css'

function Wishlist() {
    const {userObject,userSuccess}=useSelector(state=>state.users);
  const wishlist=userObject.wishlist;
  const dispatch=useDispatch();
  const deleteItem=(data)=>{
    dispatch(deleteItemFromList({username:userObject.username,payload:data}));
  }
  const addToCart=(data)=>{
    dispatch(addItemToCart({username:userObject.username,payload:data}));
    dispatch(deleteItemFromList({username:userObject.username,payload:data}));
  }
  
  return (
    <div id='wishlist'>
      {
        userSuccess===false && <>
        <h1>Please Login to View your WishList</h1>
        <button><Link to='/login' className='nav-link'>Login</Link></button>
        </>
}
{
    (userSuccess===true && wishlist.length===0) && <h4 className='text-center my-5'>No items are Saved for Later</h4>
}
{
    (userSuccess===true && wishlist.length!==0) && 

        <div id='outer-wishlist'>
        {
            wishlist.map((item,index)=><div className='inner-wishlist' key={index}>
              <div className="index">
                <p>{index+1}</p>
              </div>
              <div className="wishlist-image">
                <img src={item.productimage[0]} alt="" />
              </div>
              <div className="wishlist-desc">
                <p className='productname'>{item.productname}</p>
                <div className="price">
                <p className='productprice'><FaRupeeSign />{item.productprice}</p>
                <p className='text-decoration-line-through text-secondary productprice-2'><FaRupeeSign />{Math.floor((item.productprice)*1.1)}</p>
                </div>
                <div className="wishlist-btn">
                  <button type="button" className='remove-btn' onClick={()=>deleteItem(item)}>Remove <span className='c-icon'><FaTrashCan /></span></button>
                  <button type="button" className='addcart' onClick={()=>addToCart(item)}><span className='c-icon'><IoCartOutline /></span> Add to Cart</button>
                </div>
              </div>
            </div>)
        }
        </div>
      }
    </div>
  )
}

export default Wishlist
