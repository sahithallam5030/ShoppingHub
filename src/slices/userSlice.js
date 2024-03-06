//userSlice 
//import createSlice 
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin=createAsyncThunk('loginuser',async(useCredentials,thunkApi)=>{
    let response=await axios.post('/users/login',useCredentials);
    let data=response.data;
    if(data.message==='Success'){
        let token=data.payload;
        localStorage.setItem('token',token);
        return data.userObject;
    }
    else if(data.message==="Invalid User" || data.message==="Incorrect Password"){
        alert(data.message);
        return thunkApi.rejectWithValue(data);
    }
})

export const updateCart=createAsyncThunk('updateCart',async(userCredentials,thunkApi)=>{
    console.log(userCredentials);
    let response=await axios.put('/users/update-cart',userCredentials);
    let data=response.data;
    if(data.message==="Item Added to Cart"){
        alert(data.message);
        return data.userObject;
    }
    else{
        return thunkApi.rejectWithValue(data);
    }
})

export const addItemToCart=createAsyncThunk('additemtocart',async(productdetails,thunkApi)=>{
    console.log(productdetails);
    let response=await axios.put('/users/additemtocart',productdetails);
    let data=response.data;
    if(data.message==="Added to Cart"){
        alert(data.message);
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);
})

export const deleteItemFromCart=createAsyncThunk('deleteitemfromcart',async(productdetails,thunkApi)=>{
    console.log(productdetails);
    let response=await axios.put('/users/deleteitemfromcart',productdetails);
    let data=response.data;
    if(data.message==='Deleted from Cart'){
        alert(data.message);
        return data.payload;
    }
    else
    return thunkApi.rejectWithValue(data);
})

export const addItemToList=createAsyncThunk('additemtolist',async(productdetails,thunkApi)=>{
    let response=await axios.put('/users/additemtolist',productdetails);
    let data=response.data;
    if(data.message==="Added to Wishlist"){
        alert(data.message);
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);

})

export const deleteItemFromList=createAsyncThunk('deleteitemfromlist',async(productdetails,thunkApi)=>{
    let response=await axios.put('/users/deletefromlist',productdetails);
    let data=response.data;
    if(data.message==="Deleted from Wishlist"){
        alert(data.message);
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);

})

export const savecount=createAsyncThunk('savequantity',async(productdetails,thunkApi)=>{
    let response=await axios.put('/users/savecount',productdetails);
    let data=response.data;
    if(data.message==="Count Updated"){
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);
})

export const orders=createAsyncThunk('saveorders',async(productdetails,thunkApi)=>{
    let response=await axios.put('/users/orders',productdetails);
    let data=response.data;
    if(data.message==="Order updated"){
        return data.payload;
    }
    else {
        return thunkApi.rejectWithValue(data);
    }
})

export const userSlice=createSlice({
    name:'users',
    initialState:{
        userObject:{},
        userLoading:false,
        userSuccess:false,
        userError:false,
        userErrorMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            localStorage.clear();
            state.userObject=null;
            state.userLoading=false;
            state.userSuccess=false;
            state.userError=false;
            state.userErrorMsg="";
            return state;
        },
       updateEmail:(state,action)=>{
        state.userObject.email=action.payload;
       },
       updateNumber:(state,action)=>{
        state.userObject.mobile=action.payload;
       },
        decrementCount:(state,action)=>{
            let item=action.payload;
            state.userObject.cart=state.userObject.cart.map((data)=>{
                if(data.productname===item.productname){
                    data.count--;
                    
                }
                return data;
            })
            return state;
        },
        incrementCount:(state,action)=>{
            let item=action.payload;
            state.userObject.cart=state.userObject.cart.map((data)=>{
                if(data.productname===item.productname){
                    data.count++;
                }
                return data;
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.userObject=null;
            state.userLoading=true;
            state.userSuccess=false;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.userSuccess=true;
            state.userObject=action.payload;
            state.userLoading=false;
            state.userError=false;
            state.userErrorMsg="";
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.userSuccess=false;
            state.userObject=null;
            state.userLoading=false;
            state.userError=true;
            state.userErrorMsg=action.payload.message;
        })
        .addCase(addItemToCart.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.userObject.cart=action.payload;
            return state;
        })
        .addCase(deleteItemFromCart.fulfilled,(state,action)=>{
            state.userObject.cart=action.payload;
            return state;
        })
        .addCase(addItemToList.fulfilled,(state,action)=>{
            state.userObject.wishlist=action.payload;
            return state;
        })
        .addCase(deleteItemFromList.fulfilled,(state,action)=>{
            state.userObject.wishlist=action.payload;
            return state;
        })
        .addCase(savecount.fulfilled,(state,action)=>{
            state.userObject.cart=action.payload;
            return state;
        })
        .addCase(orders.fulfilled,(state,action)=>{
            state.userObject.orders=action.payload.orders;
            state.userObject.cart=action.payload.cart;
            return state;
        })
        
    }
})

export const {clearLoginStatus,incrementCount,decrementCount,updateEmail,updateNumber}=userSlice.actions;
export default userSlice.reducer;