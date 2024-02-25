const exp=require('express')
const productApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
let cloudinary=require('cloudinary').v2;
const { CloudinaryStorage}=require('multer-storage-cloudinary');
const multer=require('multer');


cloudinary.config({
    cloud_name:"dq9hq8oly",
    api_key:"789946353992485",
    api_secret:"CnNJZCdM8Zqw9AWpTPn5uk1eecc",
    secure:true
});
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(request,file)=>{
        return {
            folder:'products',
            public_id:file.field_name+"_"+Date.now()
        }
    }
})

let upload=multer({storage:storage});   //to save the items into cloudinary storage
productApp.use(exp.json());
//router for get the products 
productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
    //get the collection
    let productcollection=request.app.get('productcollection');
    let products=await productcollection.find().toArray();
    response.send({message:"Success",payload:products});
}))

//router to add products to database
productApp.post('/addproducts',upload.single("photo"),expressAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get('productcollection');
    let newproduct=JSON.parse(request.body.productObject);
    newproduct.productimage=request.file.path;
    await productcollection.insertOne(newproduct);
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