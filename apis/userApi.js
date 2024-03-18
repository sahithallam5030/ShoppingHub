//step-1 import required modules
//modules section
const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

userApp.use(exp.json())

const transporter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    auth:{
        user:process.env.USER,
        pass:process.env.PASSWORD
    }
});
//router for creating the user
userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    //get the collection
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    //check if the username already exists
    let userOfDatabase=await usercollection.findOne({username:userCredentials.username});
    if(userOfDatabase===null){
        //not a user of database
        let name=userCredentials.firstname+" "+userCredentials.lastname;
    const mailOptions={
        from:{
            name:"ShoppingHub",
            address:process.env.USER
        },
        to:userCredentials.email,
        subject:"Welcome to ShoppingHub",
        html:`
            <h3>Dear ${name},</h3>
            <p>We are delighted to welcome you to the ShoppingHub</p>
            <p>Thank you for entrusting ShoppingHub. We're thrilled to have you join our community of savvy shoppers. Get ready to explore a world of curated trends, where convenience meets style. From fashion to tech and everything in between, we've got you covered. Let's embark on a journey of seamless shopping and endless discovery together. Happy shopping!</p>
            <div>
                <div>Regards,</div>
                <div><b>Allam Sahith</b></div>
                <div>Founder | ShoppingHub</div>
            </div>`
    }

        
        //then hash the password to store in the database
        let hashedPassword=await bcryptjs.hash(userCredentials.password,6);
        //update the password with hashsedpassword
        userCredentials.password=hashedPassword;
        userCredentials.cart=[]
        userCredentials.wishlist=[]
        userCredentials.orders=[]
        await usercollection.insertOne(userCredentials);
        response.send({message:"Account Created Successfully"});
    }
    else{
        response.send({message:"Username already exists"})
    }
}))

//router for user login
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    //get the collection
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    //check if the username already exists
    let userOfDatabase=await usercollection.findOne({username:userCredentials.username});
    if(userOfDatabase!==null){
        //username exists check password is matched or not
        let status=await bcryptjs.compare(userCredentials.password,userOfDatabase.password);
        if(status===true){
            //password is matched then get the generate the token
            let token=jwt.sign({username:userOfDatabase.username},process.env.SECRET_KEY,{expiresIn:"1h"});
            response.send({message:"Success",payload:token,userObject:userOfDatabase});
        }
        else{
            response.send({message:"Incorrect Password"});
        }
    }
    else{
        response.send({message:"Invalid User"})
    }
}))

//router for delete user
userApp.delete('/delete-user',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    //check if the username already exists
    let userOfDatabase=await usercollection.findOne({username:userCredentials.username});
    if(userOfDatabase===null){
        response.send({message:"User not exists"});
    }
    else{
        await usercollection.deleteOne({username:userOfDatabase.username});
        response.send({message:"Account Deleted Successfully"});
    }
}))

//router for update user details
userApp.put('/update-mail',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    console.log(userCredentials)
    await usercollection.updateOne({username:userCredentials.username},{$set:{email:userCredentials.email}});
    response.send({message:"Data Updated Successfully"});

}))

userApp.put('/update-number',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    console.log(userCredentials)
    await usercollection.updateOne({username:userCredentials.username},{$set:{mobile:userCredentials.mobile}});
    response.send({message:"Data Updated Successfully"});

}))
//router to add the  item to cart
userApp.put('/additemtocart',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    //find the userObject
    let userObject=await usercollection.findOne({username:productdetails.username});
    //update the cart
    //remove _id from product payload
    delete productdetails.payload._id;
    await usercollection.updateOne({username:userObject.username},{$push:{cart:productdetails.payload}})
    
    userObject=await usercollection.findOne({username:productdetails.username})
    response.send({message:"Added to Cart",payload:userObject.cart});
}))

userApp.put('/deleteitemfromcart',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    //find the userObject
    let userObject=await usercollection.findOne({username:productdetails.username});
    //update the cart
    await usercollection.updateOne({username:userObject.username},{$pull:{cart:{productname:productdetails.payload.productname}}})
    userObject=await usercollection.findOne({username:productdetails.username});
    response.send({message:"Deleted from Cart",payload:userObject.cart});
}))

userApp.put('/additemtolist',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    let userObject=await usercollection.findOne({username:productdetails.username});
    await usercollection.updateOne({username:userObject.username},{$push:{wishlist:productdetails.payload}})
    userObject=await usercollection.findOne({username:productdetails.username});
    response.send({message:"Added to Wishlist",payload:userObject.wishlist});
}))

userApp.put('/deletefromlist',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    let userObject=await usercollection.findOne({username:productdetails.username});
    await usercollection.updateOne({username:userObject.username},{$pull:{wishlist:{productname:productdetails.payload.productname}}})
    userObject=await usercollection.findOne({username:productdetails.username});
    response.send({message:"Deleted from Wishlist",payload:userObject.wishlist});
}))

userApp.put('/savecount',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    let userObject=await usercollection.findOne({username:productdetails.username});
    await usercollection.updateOne({username:userObject.username,'cart.productname':productdetails.payload.productname},{$set:{'cart.$.count':productdetails.payload.count}})
    userObject=await usercollection.findOne({username:productdetails.username});
    response.send({message:"Count Updated",payload:userObject.cart})
}))

userApp.put('/orders',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let productdetails=request.body;
    let date=new Date();
    productdetails.order=productdetails.order.map((data)=>{
        data.orderdate=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        return data;
    })
    await usercollection.updateOne({username:productdetails.username},{$push:{orders:{$each:productdetails.order}}});
    await usercollection.updateOne({username:productdetails.username},{$set:{cart:[]}})
    let userObject=await usercollection.findOne({username:productdetails.username});
    response.send({message:"Order updated",payload:{orders:userObject.orders,cart:userObject.cart}});
}))


//step-2 export the userApp to be used in server
module.exports=userApp;
