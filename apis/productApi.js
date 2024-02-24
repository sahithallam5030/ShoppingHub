const exp=require('express')
const productApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

productApp.use(exp.json());

//router for get the products 
productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
    //get the collection
    let productcollection=request.app.get('productcollection');
    let products=await productcollection.find().toArray();
    response.send({message:"Success",payload:products});
}))

//router to add products to database
productApp.post('/addproducts',expressAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get('productcollection');
    let productObject=request.body;
    await productcollection.insertOne(productObject);
    response.send({message:"Product Added Successfully"});
}))

//router to delete product from database
productApp.delete('/deleteproduct',expressAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get('productcollection');
    let productObject=request.body;
    await productcollection.deleteOne({$and:[{producttype:productObject.producttype},{productname:productObject.productname},{productdesc:productObject.productdesc}]});
    response.send({message:"Product Deleted Successfully"});
}))


//router to update details of product
productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get('productcollection');
    let productObject=request.body;
    await productcollection.updateOne({$and:[{producttype:productObject.producttype},{productname:productObject.productname},{productdesc:productObject.productdesc}]},{$set:{...productObject}})
    response.send({message:"Product Updated Successfully"});
}))

module.exports=productApp;