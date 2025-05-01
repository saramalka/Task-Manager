import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    "name":'auth',
    initialState:{
        token:localStorage.getItem("token")||"",
        isLoggedIn:localStorage.getItem("token")?true:false,
        name:localStorage.getItem("name") || ""
    },
    reducers:{
        setToken:(state,action)=>{
            const {name,token}=action.payload
            state.token=token
            state.isLoggedIn=true
            state.name=name
            localStorage.setItem("token",token)
            localStorage.setItem("name", name);
        },
        removeToken:(state)=>{
            state.token=""
            state.isLoggedIn=false
            state.name=""
            localStorage.removeItem("token")
            localStorage.removeItem("name")
        }
    }
})

export default userSlice.reducer
export const {setToken,removeToken}=userSlice.actions