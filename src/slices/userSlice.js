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
    }
})

export const {clearLoginStatus}=userSlice.actions;
export default userSlice.reducer;