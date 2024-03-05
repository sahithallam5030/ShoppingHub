import React from 'react'
import {useSelector} from 'react-redux'

function Profile() {
  const {userObject}=useSelector(state=>state.users);
  return (
    <div>
      <h1>{userObject.username}</h1>
      <h2>{userObject.email}</h2>
      {
        (userObject.cart.length===0) ? <>No Orders</> :
        <>
        {
          userObject.cart.map((data,index)=>
            <p>{data.productname}</p>
          )
        }
        </>
      }
      
    </div>
  )
}

export default Profile
