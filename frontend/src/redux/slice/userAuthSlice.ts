import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../interface/user";
import { ProfileForm } from "../../interface/userRegistration";
import { AuthResponseRegister } from "../../interface/userResponse";
import { UploadImageResponse } from "../../interface/reserPassword";
 
// Define the state interface
interface UserAuthState {
  login: AuthResponse | null;
  profile: ProfileForm | null;
  register: AuthResponseRegister | null;
  uploadImage: UploadImageResponse | null;
  step:number
}

// Initial state
const initialState: UserAuthState = {
  login: null,
  profile: null,
  register: null,
  uploadImage: null,
  step:1 
};

// Create the user authentication slice
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    updateLoginInfo: (state, action: PayloadAction<AuthResponse>) => {
      state.login = action.payload;
    },

    updateProfileInfo: (state, action: PayloadAction<Partial<ProfileForm>>) => {
      if (state.profile) {
        // Merge the existing profile with the updated partial profile
        state.profile = { ...state.profile, ...action.payload };
      } else {
        // If there's no profile yet, just set the new partial profile
        state.profile = action.payload as ProfileForm;
      }
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateRegister: (state, action: PayloadAction<AuthResponseRegister>) => {
      state.register = action.payload;
    },
    updateUploadImage: (state, action: PayloadAction<UploadImageResponse>) => {
      state.uploadImage = action.payload;
    }     

    
  },
});

// Export actions and reducer
export const { updateLoginInfo, updateProfileInfo,updateStep , updateRegister, updateUploadImage} = userAuthSlice.actions;
export default userAuthSlice.reducer;
