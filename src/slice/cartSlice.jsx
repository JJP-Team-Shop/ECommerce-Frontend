import { createSlice } from '@reduxjs/toolkit';
import { shopApi } from '../api/shopApi';

const initialState = {
  cartItems: [], // Stores individual cart items
  totalAmount: 0, // Total cost of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItemToCart(state, action) {
      const newCartItem = action.payload; // Reflects a cart item structure
      const existingCartItem = state.cartItems.find(item => item.productId === newCartItem.productId);
      if (!existingCartItem) {
        state.cartItems.push({
          ...newCartItem,
          // Assuming newCartItem includes { productId, quantity, price, name }
        });
        state.totalAmount += newCartItem.price * newCartItem.quantity;
      } else {
        existingCartItem.quantity += newCartItem.quantity;
        state.totalAmount += newCartItem.price * newCartItem.quantity;
      }
    },
    // Action to remove an item from the cart
    removeItemFromCart(state, action) {
      const { productId, quantity } = action.payload;
      const existingCartItem = state.cartItems.find(item => item.productId === productId);
      if (existingCartItem) {
        if (existingCartItem.quantity > quantity) {
          existingCartItem.quantity -= quantity;
          state.totalAmount -= existingCartItem.price * quantity;
        } else {
          state.cartItems = state.cartItems.filter(item => item.productId !== productId);
          state.totalAmount -= existingCartItem.price * existingCartItem.quantity;
        }
      }
    },
    // Reset the cart to initial state
    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      shopApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        // Assuming payload structure matches what the frontend expects for the cart
        state.cartItems = payload.cartItems || [];
        state.totalAmount = payload.totalAmount || 0;
      }
    );
    // Include other matchers as needed for handling additional actions
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

