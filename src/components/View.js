import React,{useState} from 'react'
import {  useParams } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import {  addItemToCart, addItemToList } from '../slices/userSlice';
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import './CSS/View.css'

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
      dispatch(addItemToCart({username:userObject.username,payload:data}));
  }
  const addToWishlist=(data)=>{
    dispatch(addItemToList({username:userObject.username,payload:data}));
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
                <button type="button" className='addcart' onClick={()=>addToCart(data)}><span className='c-icon'><IoCartOutline/></span> Add to Cart</button>
                <button type="button" className='addwish' onClick={()=>addToWishlist(data)}><span className='c-icon'><FaRegHeart/></span> Add to Wishlist</button>
            </div>
        </div>
        <div id='view-description'>
            <p id='productname'>{data.productname}</p>
            <p className='d-inline-block'><FaRupeeSign/>{data.productprice}</p> 
            <p className='text-decoration-line-through text-secondary d-inline-block'><FaRupeeSign/>{Math.floor((data.productprice)*1.1)}</p>
            <p>Product Highlights</p>
            {
                data.producthighlights.map((item,index)=><ul>
                  <li key={index}><p>{item}</p></li>
                </ul>)
            }
            {
              (data.productdesc.length!==0) && <>
              <p>Product Description</p>
              <p>{data.productdesc}</p>
              </>
            }
           
        </div>
      </div>
    </div>
  )
}

export default View
