import React,{useState} from 'react'
import {  useParams } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import { saveCart,updateCart,saveList } from '../slices/userSlice';

function View() {
    let {id}=useParams();
    const {productObject}=useSelector(state=>state.products)
    let data=productObject.filter((data)=>data.productname===id);
    data=data[0];
    const [img,setImg]=useState(data.productimage[0]);
    let {userObject}=useSelector(state=>state.users);
    const dispatch=useDispatch();
  const handleImage=(image)=>{
    setImg(image);
  }
  const addToCart=(data)=>{
    if(userObject.cart.includes(data)){
      alert('Already contains item');
    }
      dispatch(saveCart(data));
    setTimeout(()=>{

      console.log('after savecart')
      dispatch(updateCart({username:userObject.username,cart:userObject.cart}));
    },5000)
  }
  const addToWishlist=(data)=>{
    dispatch(saveList(data));
    alert('Item added to wishlist')
  }
  return (
    <div id='view-page'>
      <div id='outer-view'>
        <div id='view-list'>
            {
                data.productimage.map((image,index)=><div className='view-image-item' key={index}>
                    <img src={image} alt="" onClick={()=>handleImage(image)}/>
                </div>)
            }
        </div>
        <div id='view-image'>
            <img src={img} alt="" />
            <div className="cart-buttons">
                <button type="button" className='addcart' onClick={()=>addToCart(data)}>Add to Cart</button>
                <button type="button" className='addcart' onClick={()=>addToWishlist(data)}>Add to Wishlist</button>
            </div>
        </div>
        <div id='view-description'>
            <h2>{data.productname}</h2>
            <p>{data.productdesc}</p>
            <h5><FaRupeeSign/>{data.productprice}</h5> 
            <p className='text-decoration-line-through text-secondary'><FaRupeeSign/>{Math.floor((data.productprice)*1.1)}</p>
        </div>
      </div>
    </div>
  )
}

export default View
