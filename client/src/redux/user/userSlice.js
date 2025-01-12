import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:null,
    currentUser:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state,action)=>{
            state.loading=true
        },
        signinFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        signinSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.error=null,
            state.loading=false
        }
    }
})

export  const { signinStart,signinFailure,signinSuccess } = userSlice.actions;

export default userSlice.reducer