import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    //products

    getProducts: builder.query({ query: () => "/api/Products" }),
    getProduct: builder.query({ query: (id) => `/api/Products/${id}` }),
    updateProduct: builder.mutation({
      query: (productData) => ({
        url: (id) => `/api/products/${id}`,
        method: "PATCH",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
    }),

    //users

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/api/users/",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (userData) => ({
        url: "/auth/me",
        method: "GET",
        body: userData
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),

    //cartItems

    getCartItems: builder.query({
      query: () => ({
        url: "/api/cartitems/",
        method: "GET",
      }),
    }),
    getCartItem: builder.query({
      query: () => ({
        url: (id) => `/api/cartitems/${id}`,
        method: "GET",
      }),
    }),
    createCartItem: builder.mutation({
      query: (cartItemsData) => ({
        url: "/api/cartitems/",
        method: "POST",
        body: cartItemsData,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/api/cartitems/${id}`,
        method: "DELETE",
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ id, ...cartItemsData }) => ({
        url: `/api/cartitems/${id}`,
        method: "PUT",
        body: cartItemsData,
      }),
    }),

    //carts

    getCarts: builder.query({
      query: () => ({
        url: "/api/carts/",
        method: "GET",
      }),
    }),
    getCart: builder.query({
      query: () => ({
        url: (id) => `/api/carts/${id}`,
        method: "GET",
      }),
    }),
    createCart: builder.mutation({
      query: (cartsData) => ({
        url: "/api/carts/",
        method: "POST",
        body: cartsData,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/api/carts/${id}`,
        method: "DELETE",
      }),
    }),
    updateCart: builder.mutation({
      query: (cartsData) => ({
        url: (id) => `/api/carts/${id}`,
        method: "PATCH",
        body: cartsData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCartItemsQuery,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useCreateCartItemMutation,
  useGetCartsQuery,
  useGetCartQuery,
  useCreateCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = shopApi;
