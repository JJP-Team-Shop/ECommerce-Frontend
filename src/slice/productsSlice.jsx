import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApi";

const productsSlice = createSlice({
    name: "products",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        shopApi.endpoints.getProducts.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default productsSlice.reducer;
  
