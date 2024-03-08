import React,{useState} from 'react'
import {  useParams } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import {  addItemToCart, addItemToList } from '../slices/userSlice';
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import './CSS/View.css'

function View() {
    let {id}=useParams();
    const {productObject}=useSelector(state=>state.products)
    const navigate=useNavigate();
    let data=productObject.filter((data)=>data.productname===id);
    data=data[0];
    const [img,setImg]=useState(data.productimage[0]);
    let {userObject,userSuccess}=useSelector(state=>state.users);
    const dispatch=useDispatch();
  const handleImage=(image)=>{
    setImg(image);
  }
  const addToCart=(data)=>{
    if(userSuccess===false)
    navigate('/login');
  else
      dispatch(addItemToCart({username:userObject.username,payload:data}));
  }
  const addToWishlist=(data)=>{
    if(userSuccess===false)
    navigate('/login');
  else
    dispatch(addItemToList({username:userObject.username,payload:data}));
  }
  return (
    <div id='view-page'>
      <div id='outer-view'>
        <div id='view-list'>
            {
                data.productimage.map((image,index)=><div className='view-list-item' key={index}>
                    <img src={image} alt="" onClick={()=>handleImage(image)}/>
                </div>)
            }
        </div>
        <div id='view-image'>
            <img src={img} alt="" />
            <div className="cart-buttons">
                <button type="button" id='view-addtocart' onClick={()=>addToCart(data)}><span className='c-icon'><IoCartOutline/></span> Add to Cart</button>
                <button type="button" id='view-addtolist' onClick={()=>addToWishlist(data)}><span className='c-icon'><FaRegHeart/></span> Add to Wishlist</button>
            </div>
        </div>
        <div id='view-description'>
            <p id='product-name'>{data.productname}</p>
            <div className="price">
            <p id='sold-price'><FaRupeeSign/>{data.productprice}</p> 
            <p id='marked-price'><FaRupeeSign/>{Math.floor((data.productprice)*1.1)}</p>
            </div>
            <div id="product-highlights">

            <p id='product-high'>Product Highlights:</p>
            {
              data.producthighlights.map((item,index)=><ul>
                  <li key={index}><p>{item}</p></li>
                </ul>)
            }
            </div>
            {
              (data.productdesc.length!==0) && <div id='product-description'>
              <p id='product-desc'>Product Description:</p>
              <p id='desc'>{data.productdesc}</p>
              </div>
            }
           
        </div>
      </div>
    </div>
  )
}

export default View
