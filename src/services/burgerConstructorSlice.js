import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    removeBun: (state) => {
      state.bun = null;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((_,idx) => idx !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBun, removeBun, addIngredient, removeIngredient } = burgerConstructor.actions;

export default burgerConstructor.reducer;
