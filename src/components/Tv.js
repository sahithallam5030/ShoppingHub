import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
function Tv() {
    const {productObject}=useSelector(state=>state.products);
    let tvs=[]
    if(productObject!==null){
    tvs=productObject.filter(data=>data.producttype==="tvs");
    }
  return (
    <div>
        {
        (tvs.length===0) ? <h1>Telivision Section</h1> :
        <table>
            {
                tvs.map((data,index)=><tr key={index}>
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

export default Tv
