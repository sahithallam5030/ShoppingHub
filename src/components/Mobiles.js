import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

function Mobiles() {
    const {productObject}=useSelector(state=>state.products);
    let mobiles=[]
    if(productObject!==null){
     mobiles=productObject.filter(data=>data.producttype==="mobiles");
    }
  return (
    <div>
        {
        (mobiles.length===0) ? <h1>Mobile Section</h1> :
        <table>
            {
                mobiles.map((data,index)=><tr key={index}>
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

export default Mobiles
