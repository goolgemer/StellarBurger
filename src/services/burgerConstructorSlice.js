import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid'

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
      state.ingredients.push({
        ...action.payload,
        uniqueId: nanoid(),
      });
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((_, idx) => idx !== action.payload);
    },
    moveIngredient: (state, action) => {
      const prevValue = state.ingredients.splice(action.payload.dragIndex, 1)[0];
      state.ingredients.splice(action.payload.hoverIndex, 0, prevValue);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBun, removeBun, addIngredient, removeIngredient, moveIngredient } = burgerConstructor.actions;

export default burgerConstructor.reducer;
