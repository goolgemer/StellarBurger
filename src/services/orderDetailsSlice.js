import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  error: null,
};

export const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.details = action.payload;
      state.error = null;
    },
    setOrderDetailsError: (state, action) => {
      state.error = action.payload;
    },
    clearOrderDetails: (state, action) => {
      state.details = null;
      state.error = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setOrderDetails, setOrderDetailsError, clearOrderDetails } = orderDetails.actions;

export default orderDetails.reducer;
