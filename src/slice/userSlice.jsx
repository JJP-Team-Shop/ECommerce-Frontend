import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetUserData = createAsyncThunk(
    "user/getUserData",
    async (_, thunkAPI) => {
      try {
        const response = await fetch("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
  
  const GetUserSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
      setUserInfo: (state, action) => {
        return action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(GetUserData.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const { setUserInfo } = GetUserSlice.actions;
  export default GetUserSlice.reducer;
  