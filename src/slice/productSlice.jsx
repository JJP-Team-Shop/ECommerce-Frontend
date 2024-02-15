import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApi";

const productSlice = createSlice({
    name: "product",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        shopApi.endpoints.getProduct.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default productSlice.reducer;
  
