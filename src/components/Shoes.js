import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

function Shoes() {
    const {productObject}=useSelector(state=>state.products);
    let shoes=[]
    if(productObject!==null){
    shoes=productObject.filter(data=>data.producttype==="tvs");
    }
  return (
    <div>
        {
        (shoes.length===0) ? <h1>Shoes Section</h1> :
      <table>
            {
                shoes.map((data,index)=><tr key={index}>
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

export default Shoes
