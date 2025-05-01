import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    "name":'user',
    initialState:{
        token:localStorage.getItem("token")||"",
        isLoggedIn:localStorage.getItem("token")?true:false,
        userName:""
    },
    reducers:{
        setToken:(state,action)=>{
            const token=action.payload.token
            state.token=token
            state.isLoggedIn=true
            localStorage.setItem("token",token)
        },
        removeToken:(state,action)=>{
            state.token=""
            state.isLoggedIn=false
            localStorage.removeItem("token")
        }
    }
})

export default userSlice.reducer
export const {setToken,removeToken}=userSlice.actions