import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../api/shopApi";
import productsSlice from "../slice/productsSlice";
import productSlice from "../slice/productSlice";
import userSlice from "../slice/userSlice";
import cartSlice from "../slice/cartSlice";
import cartItemsSlice from "../slice/cartItemsSlice";

export const store = configureStore({
    reducer: {
      [shopApi.reducerPath]: shopApi.reducer,
      products: productsSlice,
      product: productSlice,
      user: userSlice,
      cart: cartSlice,
      cartItems: cartItemsSlice,
    },
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shopApi.middleware),
  });
  
  export default store;