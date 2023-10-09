// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'burgerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://norma.nomoreparties.space/api/' }),
  endpoints: (build) => ({
    getIngredients: build.query({
      query: () => ({ url: 'ingredients' }),
      transformResponse: (response) => response.data,
      providesTags: (result = []) => [
        ...result.map(({ _id }) => ({ type: 'Ingredients', id: _id })),
      ],
    }),
  }),
})
