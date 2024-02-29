import React from 'react'
import {useSelector} from 'react-redux'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";

function Books() {
    const {productObject}=useSelector(state=>state.products);
    let books=[]
    if(productObject!==null){
        books=productObject.filter((data)=>data.producttype==="books");
    }
    const userView=(data)=>{
      console.log(data);
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
            <div className="item-price"><h5><FaRupeeSign />{data.productprice}</h5></div>
          </div> )
        }
        </>
}
    </div>
    </>
  )
}

export default Books
