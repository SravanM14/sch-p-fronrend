import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";



const authPersistConfig ={
  key:"auth",
  storage:{
    getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
      return Promise.resolve();
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
      return Promise.resolve();
    },
}
}

const persistedAuthReducer = persistReducer(
    authPersistConfig,
    authReducer
)

export const store = configureStore({
    reducer :{
        auth:persistedAuthReducer,
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