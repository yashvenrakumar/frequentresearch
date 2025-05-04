import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./slice/userAuthSlice"; 
import snackbarReducer from "./slice/snackbarSlice";
export const rootReducer = combineReducers({
   userAuth: userAuthReducer, 
   snackbar: snackbarReducer,
},    // Enable Redux DevTools
);

export type RootState = ReturnType<typeof rootReducer>;
