import React from 'react'
import {useSelector} from 'react-redux'

function Books() {
    const {productObject}=useSelector(state=>state.products);
    let books=[]
    if(productObject!==null){
        books=productObject.filter((data)=>data.producttype==="books");
    }
  return (
    <div>
      {
        (books.length===0) ? <h1>Books Section</h1> :
        <table>
            {
                books.map((data,index)=><tr key={index}>
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

export default Books
