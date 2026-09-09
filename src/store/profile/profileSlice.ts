import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Profile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  role: "ADMIN" | "TEACHER" | "PARENT";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string | null;
  gender: string | null;
  profileImage: string | null;
}
interface profileState{
    profile:Profile | null;
    isLoading:boolean;
    error:string | null;
}


const initialState:profileState = {
    profile:null,
    isLoading:false,
    error:null
}

export const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setProfile:(state, action:PayloadAction<Profile>)=>{
            state.profile = action.payload; 

        },
        setLoading:(state, action:PayloadAction<boolean>)=>{
            state.isLoading = action.payload;
        },
        setError:(state, action:PayloadAction<string | null>)=>{
            state.error = action.payload;
        },

        clearProfile:(state)=>{
            state.profile = null;
            state.isLoading = false;
            state.error = null;
        }
    }
});

export const { setProfile, setLoading, setError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;