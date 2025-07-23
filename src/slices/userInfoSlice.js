import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "info",
  initialState: {
    // ================== localStorage data check kore save kore rakha -jate reload dilte redux theke na jay =============
    value: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null,  // ================== String theke array object kora hoaeche =============
  },
  reducers: {
    userDetails: (state, action) => {
      state.value = action.payload;
      //   console.log(state.value); //   ============== Current data -"state.value joma thake============"
      //   console.log(action.payload); //   ============== dispatch madde pathano data -"action.payload joma thake============"
    },
  },
});

export const { userDetails } = userInfoSlice.actions;

export default userInfoSlice.reducer;
