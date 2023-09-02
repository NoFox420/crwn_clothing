import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
};

//createSlice creates actions aswell as action types
export const userSlice = createSlice({
  //action type
  name: "user",
  initialState: INITIAL_STATE,
  //reducer slice
  reducers: {
    //what gets dispatched if action type matches
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

//pulling of the actions of userSlice object
export const { setCurrentUser } = userSlice.actions;

//pulling of the reducer of userSlice to pass onto rootReducer
export const userReducer = userSlice.reducer;
