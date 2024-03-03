import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { deleteItemList,saveCart } from '../slices/userSlice';
import { FaTrashCan } from "react-icons/fa6";

function Wishlist() {
    const {userObject,userSuccess}=useSelector(state=>state.users);
  const wishlist=userObject.wishlist;
  const dispatch=useDispatch();
  const deleteItemFromList=(data)=>{
    dispatch(deleteItemList(data));
  }
  const addToCart=(data)=>{
    dispatch(saveCart(data));
    dispatch(deleteItemFromList(data));
  }
  
  return (
    <div>
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

        <div className='outer-cart'>
        {
            wishlist.map((item,index)=><div className='inner-cart' key={index}>
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
                  <button type="button" className='mx-4 border-0' onClick={()=>deleteItemFromList(item)}>Remove <FaTrashCan /></button>
                  <button type="button" className='addcart btn' onClick={()=>addToCart(item)}>Add to Cart</button>
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
