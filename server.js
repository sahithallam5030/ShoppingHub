//step1 import required modules 
//modules section
const exp=require('express');
const app=exp();
const userApi=require('./apis/userApi');
const productApi=require('./apis/productApi')
const cors=require('cors');
const path=require('path');
const mclient=require('mongodb').MongoClient
require('dotenv').config();

app.use(cors());
app.use(exp.json())

app.use(exp.static(path.join(__dirname,'./build')))

//step-2 connect to database using mongoclient and returns a promise
// database section 
mclient.connect(process.env.DATABASE_URL)
.then((client)=>{
    let database=client.db('shoppinghub');
    let usercollection=database.collection('usercollection');
    let productcollection=database.collection('productcollection');
    app.set('usercollection',usercollection);
    app.set('productcollection',productcollection);
    console.log("Database connection success");
})
.catch((error)=>{
    console.log("Error occured in connecting to database",error.message);
})

//step-4 separate the apis based on the url
app.use('/users',userApi);
app.use('/products',productApi);

//step-6 handling errors
app.use((error,request,response,next)=>{
    console.log("Error occured",error);
    response.send({message:`Error occured ${error.message}`});
})


app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

//step-2 listen to the port
app.listen(process.env.PORT,()=>{
    console.log("Server listening to port ",process.env.PORT);
})