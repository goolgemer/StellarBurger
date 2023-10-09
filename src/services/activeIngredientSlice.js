import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const activeIngredient = createSlice({
  name: "activeIngredient",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = action.payload;
    },
    remove: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = activeIngredient.actions;

export default activeIngredient.reducer;
