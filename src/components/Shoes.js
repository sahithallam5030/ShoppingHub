import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";

function Shoes() {
    const {productObject}=useSelector(state=>state.products);
    let shoes=[]
    if(productObject!==null){
    shoes=productObject.filter(data=>data.producttype==="shoes");
    }
  return (
    <>
    <Header/>
    <div>
    {
        (shoes.length===0) ? <h1>shoes Section</h1> :
        <>
        {
          shoes.map((data,index)=> <div className="outer-item" key={index}>
            <div className="item-images">
              <img src={data.productimage[0]} alt="" />
            </div>
            <div className="item-description">
              <h4>{data.productname}</h4>
              <div className="highlight-list">
            <ul>
              {
                data.producthighlights.map((list,index)=><li key={index}><p>{list}</p></li>)
              }
            </ul>
            </div>
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

export default Shoes
