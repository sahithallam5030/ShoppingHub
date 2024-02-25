//create the store by configuring the store
//modules section 
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfig={
    key:"root",
    version:1,
    storage
}
const reducer=combineReducers({
    users:userReducer,
    products:productReducer
})

const persistedReducer=persistReducer(persistConfig,reducer);
//external export of store --configure store takes object as an argument
export const store=configureStore({
    reducer:persistedReducer
    
})