import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';

function Admin() {
    const {register,handleSubmit}=useForm();
    let [img,setImg]=useState(null)
    const onImageSelect=(event)=>{
        console.log(event)
        setImg(event.target.files);
    }
    const onFormSubmit=(productdata)=>{
        let formData=new FormData();
        formData.append("productObject",JSON.stringify(productdata));
        for(let i=0;i<img.length;i++){
            formData.append("photo",img[i]);
        }
        
        axios.post('http://localhost:3000/products/addproducts',formData)
        .then((response)=>{
            alert(response.data.message);
        })
        .catch(error=>console.log(error))
    }
  return (
    
    <div>
        <h3 className='text-center mt-3'>Product Addtion</h3>
        <div className="inner-admin-form">
            <form onSubmit={handleSubmit(onFormSubmit)}>

            <div className="inputs">
                <label htmlFor="producttype">ProductType</label>
                <select name="producttype" id="producttype" className='form-select' {...register('producttype')}>
                    <option value="mobiles" >mobiles</option>
                    <option value="TV" >TV</option>
                    <option value="laptops" >laptops</option>
                    <option value="shoes" >shoes</option>
                    <option value="books" >books</option>
                </select>
            </div>
            <div className="inputs">
                <label htmlFor="productcompany" className='form-label'>Productcompany</label>
                <input type="text" name="productcompany" id="productcompany" {...register('productcompany')} placeholder='Enter product company' className='form-control'/>
            </div>
            <div className="inputs">
                <label htmlFor="productname" className='form-label'>ProductName</label>
                <input type="text" name="productname" id="productname" {...register('productname')} placeholder='Enter product name' className='form-control'/>
            </div>
            <div className="inputs">
                <label htmlFor="productdesc" className='form-label'>ProductDescription</label>
                <textarea name="productdesc" id="productdesc" cols="30" rows="5" placeholder='Enter the description' className='form-control' {...register('productdesc')}></textarea>
            </div>
            <div className="inputs">
                <label htmlFor="productprice" className='form-label'>ProductPrice</label>
                <input type="text" name="productprice" id="productprice" className='form-control' placeholder='Enter price' {...register('productprice')}/>
            </div>
            <div className="inputs">
                <label htmlFor="productimages" className='form-label'>ProductImages</label>
                <input type="file" name="photo" id="productimages" className='form-control' multiple  onChange={(event)=>onImageSelect(event)}/>
            </div>
            <div className="submit-btn">
                <button type="submit" className="btn btn-success">ADD</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Admin
