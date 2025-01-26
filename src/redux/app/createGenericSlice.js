import { createSlice } from "@reduxjs/toolkit";

function createGenericSlice(name, initialState, extraReducers) {
  return createSlice({
    name,
    initialState,
    reducers: {
      get: (state, action) => {
        state.data = action.payload;
      },
      create: (state, action) => {
        state.data = action.payload;
      },
      update: (state, action) => {
        state.data = action.payload;
      },
      delete: (state, action) => {
        state.data = action.payload;
      },
      ...extraReducers,
    },
  });
}

export default createGenericSlice;
