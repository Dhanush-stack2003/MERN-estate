import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from './user/userSlice.js';
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from "redux-persist";

const userConfig = combineReducers({user:userSlice})

const persistConfig = {
  key:"root",
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig,userConfig)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>{
   return getDefaultMiddleware({
      serializableCheck:false
    })
  }
});

export const persistor = persistStore(store);
