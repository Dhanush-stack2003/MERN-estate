import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user/userSlice.js'

export const store = configureStore({
  reducer: {user:userSlice},
  middleware:(getDefaultMiddleware)=>{
   return getDefaultMiddleware({
      serializableCheck:false
    })
  }
});
