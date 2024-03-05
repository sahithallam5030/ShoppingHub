import React from 'react'
import {useSelector} from 'react-redux'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './CSS/productpage.css'

function Books() {
    const {productObject}=useSelector(state=>state.products);
    const navigate=useNavigate();
    let books=[]
    if(productObject!==null){
        books=productObject.filter((data)=>data.producttype==="books");
    }
    const userView=(data)=>{
      console.log(data);
      navigate(`/view/${data.productname}`);
    }
  return (
    <>
    <Header/>
    <div>
      {
        (books.length===0) ? <h1>Books Section</h1> :
        <>
        {
          books.map((data,index)=> <div className="outer-item" key={index} onClick={()=>userView(data)}>
            <div className="item-images">
              <img src={data.productimage} alt="" />
            </div>
            <div className="item-description">
              <h4>{data.productname}</h4>
              <p>{data.productdesc}</p>
            </div>
            <div className="item-price"><p className='d-inline-block me-3 fs-4'><FaRupeeSign />{data.productprice}</p><p className='text-decoration-line-through text-secondary d-inline-block'> <FaRupeeSign />{Math.ceil((data.productprice)*1.1)}</p></div>
          </div> )
        }
        </>
}
    </div>
    </>
  )
}

export default Books
