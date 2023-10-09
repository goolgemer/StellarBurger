import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "bun",
};

export const currentTab = createSlice({
  name: "currentTab",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = currentTab.actions;

export default currentTab.reducer;
