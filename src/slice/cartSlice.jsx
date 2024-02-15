import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApi";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        shopApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default cartSlice.reducer;
  