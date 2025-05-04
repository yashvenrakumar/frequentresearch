import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../interface/user";

// Define the state interface
interface UserAuthState {
  login: AuthResponse | null;
}

// Initial state
const initialState: UserAuthState = {
  login: null,
};

// Create the user authentication slice
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    updateLoginInfo: (state, action: PayloadAction<AuthResponse>) => {
      state.login = action.payload;
    },
  },
});

// Export actions and reducer
export const { updateLoginInfo } = userAuthSlice.actions;
export default userAuthSlice.reducer;
