import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import profileReducer from "./profile/profileSlice";
import UserListSlice from"./usersList/usersSlice";
import StudentListSlice from "./student/studentSlice";


// const authPersistConfig ={
//   key:"auth",
//   storage:{
//     getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
//     setItem: (key: string, value: string) => {
//       localStorage.setItem(key, value);
//       return Promise.resolve();
//     },
//     removeItem: (key: string) => {
//       localStorage.removeItem(key);
//       return Promise.resolve();
//     },
// }
// }
const storage = {
  getItem: (key: string) => {
    return Promise.resolve(
      localStorage.getItem(key)
    );
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const authPersistConfig = {
  key: "auth",
  storage
}

const persistedAuthReducer = persistReducer(
    authPersistConfig,
    authReducer
)

export const store = configureStore({
    reducer :{
        auth:persistedAuthReducer,
        profile:profileReducer,
        usersList:UserListSlice,
        studentList:StudentListSlice,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// --------------------------------------------------
// Root State Type
// --------------------------------------------------

export const persistor = persistStore(store);

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;