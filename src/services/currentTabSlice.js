import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "bun",
  visibleTabs: {
    bun: true,
    main: false,
    sauce: false,
  },
};

export const currentTab = createSlice({
  name: "currentTab",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visibleTabs[action.payload.category] = action.payload.isVisible;
      if (action.payload.isVisible) {
        state.value = action.payload.category;
      } else {
        state.value = Object.keys(state.visibleTabs).find(value => state.visibleTabs[value]) ?? "bun";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisible } = currentTab.actions;

export default currentTab.reducer;
