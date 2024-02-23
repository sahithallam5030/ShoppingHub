//step-1 import required modules
//modules section
const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

userApp.use(exp.json())
//router for creating the user
userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    //get the collection
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    //check if the username already exists
    let userOfDatabase=await usercollection.findOne({username:userCredentials.username});
    if(userOfDatabase===null){
        //not a user of database
        //then hash the password to store in the database
        let hashedPassword=await bcryptjs.hash(userCredentials.password,6);
        //update the password with hashsedpassword
        userCredentials.password=hashedPassword;
        userCredentials.cart=[]
        userCredentials.wishlist=[]
        await usercollection.insertOne(userCredentials);
        response.send({message:"Account Created Successfully"});
    }
    else{
        response.send({message:"Username already exists try with another username"})
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
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get('usercollection');
    let userCredentials=request.body;
    if(userCredentials.password!==undefined){
        let hashedPassword=await bcryptjs.hash(userCredentials.password,6);
        userCredentials.password=hashedPassword;
    }
    await usercollection.updateOne({username:userCredentials.username},{$set:{...userCredentials}});
    response.send({message:"Data Updated Successfully"});

}))
//step-2 export the userApp to be used in server
module.exports=userApp;