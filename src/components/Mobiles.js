import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";

function Mobiles() {
    const {productObject}=useSelector(state=>state.products);
    let mobiles=[]
    if(productObject!==null){
     mobiles=productObject.filter(data=>data.producttype==="mobiles");
    }
  return (
    <>
    <Header/>
    <div>
    {
        (mobiles.length===0) ? <h1>mobiles Section</h1> :
        <>
        {
          mobiles.map((data,index)=> <div className="outer-item" key={index}>
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

export default Mobiles
