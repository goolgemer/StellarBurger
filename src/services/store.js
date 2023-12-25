import { configureStore } from '@reduxjs/toolkit'
import activeIngredient from './activeIngredientSlice'
import burgerConstructor from './burgerConstructorSlice'
import currentTab from './currentTabSlice'
import orderDetails from './orderDetailsSlice'
import { api } from './api'

export const store = configureStore({
  reducer: {
    activeIngredient,
    burgerConstructor,
    currentTab,
    orderDetails,
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
