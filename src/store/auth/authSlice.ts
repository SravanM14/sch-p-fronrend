import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


//User Type

export interface AuthUser{
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  role: string;
  isActive: boolean;
}


//AuthState type

interface AuthState{
    user:AuthUser |null;
    accessToken:string | null;
    refreshToken:string | null;
    isAuthenticated:boolean;
}


// AuthPayload type

interface AuthPayload{
    user:AuthUser;
    accessToken:string;
    refreshToken:string;
}

const initialState:AuthState = {
    user:null,
    accessToken:null,
    refreshToken:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        //login auth
        setCredintials:(state, action:PayloadAction<AuthPayload>)=>{
               
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken
            state.isAuthenticated = true;
        },
       // logout auth

       logOut:(state)=>{
        state.user = null;
        state.accessToken = null;
        state.refreshToken= null;
        state.isAuthenticated = false;
       }

    }
})

export const {
    setCredintials, logOut
} = authSlice.actions;


export default authSlice.reducer;