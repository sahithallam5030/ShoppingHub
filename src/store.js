//create the store by configuring the store
//modules section 
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'

//external export of store --configure store takes object as an argument
export const store=configureStore({
    user:userReducer,
    prodcucts:productReducer
})