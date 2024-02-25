import React, { useEffect } from 'react'
import Header from './Header'
import {useSelector,useDispatch} from 'react-redux'
import { getProducts } from '../slices/productSlice';
import Loading from './loading/Loading';

function Home() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[])
 const {productLoading,productError}=useSelector(state=>state.products);

  return (
    <div>
      <Header/>
      <div className="home-page">
      {
        productLoading===true && <Loading/>
      }
      {
        productError===true && <h1>Error 404</h1>
      }
      </div>
    </div>
  )
}

export default Home
