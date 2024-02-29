import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";
function Tv() {
    const {productObject}=useSelector(state=>state.products);
    let tvs=[]
    if(productObject!==null){
    tvs=productObject.filter(data=>data.producttype==="tvs");
    }
  return (
    <>
    <Header/>
    <div>
    {
        (tvs.length===0) ? <h1>tvs Section</h1> :
        <>
        {
          tvs.map((data,index)=> <div className="outer-item" key={index}>
            <div className="item-images">
              <img src={data.productimage[0]} alt="" />
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

export default Tv
