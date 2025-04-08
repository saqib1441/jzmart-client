import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TempDataDTO with possible undefined values
export type TempDataDTO = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

// Define the initial state
type InitialStateDTO = {
  tempData: TempDataDTO | null;
};

// Initial state
const initialState: InitialStateDTO = {
  tempData: null,
};

// Create slice for authentication state management
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTempData: (state, action: PayloadAction<Partial<TempDataDTO>>) => {
      // Update tempData with a partial object from the action payload
      state.tempData = { ...state.tempData, ...action.payload };
    },
    clearTempData: (state) => {
      state.tempData = null;
    },
  },
});

// Export action to set tempData
export const { setTempData, clearTempData } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
