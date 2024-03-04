//userSlice 
//import createSlice 
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin=createAsyncThunk('loginuser',async(useCredentials,thunkApi)=>{
    let response=await axios.post('http://localhost:3000/users/login',useCredentials);
    let data=response.data;
    if(data.message==='Success'){
        let token=data.payload;
        localStorage.setItem('token',token);
        return data.userObject;
    }
    else if(data.message==="Invalid User" || data.message==="Incorrect Password"){
        return thunkApi.rejectWithValue(data);
    }
})

export const updateCart=createAsyncThunk('updateCart',async(userCredentials,thunkApi)=>{
    console.log(userCredentials);
    let response=await axios.put('http://localhost:3000/users/update-cart',userCredentials);
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
    let response=await axios.put('http://localhost:3000/users/additemtocart',productdetails);
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
    let response=await axios.put('http://localhost:3000/users/deleteitemfromcart',productdetails);
    let data=response.data;
    if(data.message==='Deleted from Cart'){
        alert(data.message);
        return data.payload;
    }
    else
    return thunkApi.rejectWithValue(data);
})

export const addItemToList=createAsyncThunk('additemtolist',async(productdetails,thunkApi)=>{
    let response=await axios.put('http://localhost:3000/users/additemtolist');
    let data=response.data;
    if(data.message==="Added to Wishlist"){
        alert(data.message);
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);

})

export const deleteItemFromList=createAsyncThunk('deleteitemfromlist',async(productdetails,thunkApi)=>{
    let response=await axios.put('http://localhost:3000/users/deletefromlist');
    let data=response.data;
    if(data.message==="Deleted from Wishlist"){
        alert(data.message);
        return data.payload;
    }
    else 
    return thunkApi.rejectWithValue(data);

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
        saveCart:(state,action)=>{
            state.userObject.cart.push(action.payload);
            return state;
        },
        saveList:(state,action)=>{
            state.userObject.wishlist.push(action.payload);
            return state;
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
        },
        deleteItem:(state,action)=>{
            let item=action.payload;
            state.userObject.cart=state.userObject.cart.filter((data)=>data.productname!==item.productname)
            return state;
        },
        deleteItemList:(state,action)=>{
            let item=action.payload;
            state.userObject.wishlist=state.userObject.wishlist.filter((data)=>data.productname!==item.productname);
            return state;
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
    }
})

export const {clearLoginStatus,saveCart,incrementCount,decrementCount,deleteItem,deleteItemList,saveList}=userSlice.actions;
export default userSlice.reducer;