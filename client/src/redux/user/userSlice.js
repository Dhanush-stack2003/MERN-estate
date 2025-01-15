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
        },
        updateUserStart:(state,action)=>{
            state.loading=true
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload
            state.currentUser=null
            state.loading=null
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=action.null
            state.error=action.null
        }
    }
})

export  const { signinStart,signinFailure,signinSuccess,updateUserStart,updateUserFailure,updateUserSuccess } = userSlice.actions;

export default userSlice.reducer