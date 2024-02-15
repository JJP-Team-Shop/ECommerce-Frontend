import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApi";

const cartItemsSlice = createSlice({
    name: "cartitems",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        shopApi.endpoints.getCartItems.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default cartItemsSlice.reducer;
  