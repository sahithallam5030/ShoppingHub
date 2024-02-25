import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

function Laptops() {
    const {productObject}=useSelector(state=>state.products);
    let laptops=[]
    if(productObject!==null){
    laptops=productObject.filter(data=>data.producttype==="tvs");
    }
  return (
    <div>
        {
        (laptops.length===0) ? <h1>Laptops Section</h1> :
      <table>
            {
                laptops.map((data,index)=><tr key={index}>
                    <td>{data.productname}</td>
                    <td>{data.productdesc}</td>
                    <td>{data.productprice}</td>
                </tr>)
            }
        </table>
}
    </div>
  )
}

export default Laptops
