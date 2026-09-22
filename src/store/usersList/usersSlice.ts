import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  userId:string;
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


export interface UserList{
    data : User[] | null;
    isLoading:boolean;
    error:string|null;
    totalUsers: number;
    currentPage: number;
    limit: number;
}


const initialState: UserList = {
    data: [],
    isLoading: false,
    error: null,

    totalUsers: 0,
    currentPage: 1,
    limit: 10
};

const UserListSlice = createSlice({
    name:'userList',
    initialState,
    reducers:{
        setUserList: (state, action: PayloadAction<User[]>) => {
            state.data = action.payload;
        },
        setUserListLoading:(state, action:PayloadAction<boolean>)=>{
        state.isLoading = action.payload
        },
        setUserListError:(state, action:PayloadAction<string | null>)=>{
            state.error = action.payload;
        },

        setClearUsetList: (state)=>{
            state.data = [];
            state.isLoading=false;
            state.error=null
        },

        setPagination:(state, action:PayloadAction<{ totalUsers: number;currentPage: number;limit: number}>)=>{
          state.currentPage = action.payload.currentPage;
          state.limit =action.payload.limit;
          state.totalUsers = action.payload.totalUsers
        }

    },
});

export const { setUserList, setUserListLoading, setUserListError, setClearUsetList, setPagination} = UserListSlice.actions;
export default UserListSlice.reducer;