import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    "name":'auth',
    initialState:{
        token:localStorage.getItem("token")||"",
        isLoggedIn:localStorage.getItem("token")?true:false,
        name:localStorage.getItem("name") || "",
        role:localStorage.getItem("role")||"member"
    },
    reducers:{
        setToken:(state,action)=>{
            const {name,role,token}=action.payload
            state.token=token
            state.isLoggedIn=true
            state.name=name
            state.role=role
            localStorage.setItem("token",token)
            localStorage.setItem("name", name)
            localStorage.setItem("role",role)
        },
        removeToken:(state)=>{
            state.token=""
            state.isLoggedIn=false
            state.name=""
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            localStorage.removeItem("role")
        }
    }
})

export default userSlice.reducer
export const {setToken,removeToken}=userSlice.actions