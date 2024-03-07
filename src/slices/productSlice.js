//product slice
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getProducts=createAsyncThunk('getproducts',async(thunkApi)=>{
    let response=await axios.get('/products/getproducts');
    let data=response.data;
    console.log(data);
    if(data.message==="Success"){
        return data.payload;
    }
    else{
        return thunkApi.rejectWithValue(data);
    }
})

export const productSlice=createSlice({
    name:'products',
    initialState:{
        productObject:{},
        productLoading:false,
        productSuccess:false,
        productError:false,
        productErrorMsg:''
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.productObject=null;
            state.productLoading=true;
            state.productSuccess=false;
            state.productError=false;
            state.productErrorMsg='';
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.productObject=action.payload;
            state.productLoading=false;
            state.productSuccess=true;
            state.productError=false;
            state.productErrorMsg='';
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.productObject=null;
            state.productLoading=false;
            state.productSuccess=false;
            state.productError=true;
            state.productErrorMsg='error';
        })
    }
})

export const {}=productSlice.actions;
export default productSlice.reducer;