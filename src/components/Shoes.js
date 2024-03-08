import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Header from './Header';
import { FaRupeeSign } from "react-icons/fa";
function Shoes() {
    const {productObject}=useSelector(state=>state.products);
    let shoes=[]
    const navigate=useNavigate();
    if(productObject!==null){
    shoes=productObject.filter(data=>data.producttype==="shoes");
    }
    const userView=(data)=>{
      navigate(`/view/${data.productname}`,{replace:true});
    }
  return (
    <>
    <Header/>
    <div>
    {
        (shoes.length===0) ? <h1>No Items to View</h1> :
        <>
        {
          shoes.map((data,index)=> <div className="outer-item" key={index} onClick={()=>userView(data)}>
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
            <div className="item-price"><p className='d-inline-block me-3 fs-4'><FaRupeeSign />{data.productprice}</p><p className='text-decoration-line-through text-secondary d-inline-block'> <FaRupeeSign />{Math.ceil((data.productprice)*1.5)}</p></div>
          </div> )
        }
        </>
}
    </div>
                    </>
  )
}

export default Shoes
