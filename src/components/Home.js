import React, { useEffect } from 'react'
import Header from './Header'
import {useSelector,useDispatch} from 'react-redux'
import { getProducts } from '../slices/productSlice';
import Loading from './loading/Loading';
import Footer from './Footer'
import home from '../images/homebanner.svg'
import {Link,useNavigate} from 'react-router-dom'
import Error from './Error';
import { FaRupeeSign } from "react-icons/fa";

function Home() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch(getProducts());
  },[])
 const {productLoading,productError,productSuccess,productObject}=useSelector(state=>state.products);
 const {userSuccess}=useSelector(state=>state.users);
 let mobiles=[]
 let laptops=[]
 let books=[]
 if(productSuccess===true){
  mobiles=productObject.filter(data=>data.producttype==='mobiles');
  laptops=productObject.filter(data=>data.producttype==='laptops');
  books=productObject.filter(data=>data.producttype==='books');
 }
 
mobiles.sort(()=>Math.random()-0.5);
laptops.sort(()=>Math.random()-0.5)
books.sort(()=>Math.random()-0.5);
mobiles=mobiles.slice(0,10);
laptops=laptops.slice(0,10);
books=books.slice(0,10);
const userView=(data)=>{
  navigate(`/view/${data.productname}`);
}
  return (
    <div>
      <Header/>
      {
        productLoading===true && <Loading/>
      }
      <div className="home-page">
      {
        productError===true && <Error/>
      }
      {
        productSuccess===true && <div>
          <div className="home-banner">
            <div className="banner-content">
              <h1>Welcome to Shopping Hub</h1>
              <p>Elevate your style with curated trends. Seamless shopping for fashion, tech, and home essentials. Discover excellence, redefine your experience.</p>
              {
                userSuccess===true ? <></> :<button className="get-start"><Link to='/signup' className='nav-link'>Get Started</Link></button>
              }
              
            </div>
            <div className="banner-image">
              <img src={home} alt="" />
            </div>
          </div>
          <div className="items-section">
            <div className="item-header d-flex justify-content-between my-3">
            <h4>Best Selling Books</h4>
              <Link className='nav-link text-decoration-underline me-4' to='/books'>See All</Link>
            </div>
            <div className="collection">
              {
                books.map((data,index)=><div className='card' key={index} onClick={()=>userView(data)}>
                  <img src={data.productimage[0]} alt='product-image' className='home-product'/>
                  <div className="card-body">
                    <p className='card-text b'>{data.productname}</p>
                    <p className='card-text'><FaRupeeSign/>{data.productprice}</p>
                    {/* <p className="card-text text-decoration-line-through"><FaRupeeSign/>{Math.floor((data.productprice)*1.1)}</p> */}
                  </div>

                </div>)
              }
            </div>
          </div>
          <div className="items-section">
          <div className="item-header d-flex justify-content-between my-3">
            <h4>Best Selling Laptops</h4>
              <Link className='nav-link text-decoration-underline me-4' to='/laptops'>See All</Link>
            </div>
            <div className="collection">
              {
                laptops.map((data,index)=><div className='card' key={index} onClick={()=>userView(data)}>
                  <img src={data.productimage[0]} alt='product-image' className='home-product'/>
                  <div className='card-body'>
                    <p className="card-text">{data.productname}</p>
                    <p className='card-text'><FaRupeeSign/>{data.productprice}</p>
                    <p className='card-text'></p>
                  </div>

                </div>)
              }
            </div>
          </div>
          
        </div>
      }
      </div>
      <Footer/>
    </div>
  )
}

export default Home
