import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string;
  type: "success" | "warning" | "error" | null;
}

const initialState: SnackbarState = {
  message: "",
  type: null,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearSnackbar: (state) => {
      state.message = "";
      state.type = null;
    },
  },
});

export const { showSnackbar, clearSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
