import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    phoneNumber: null,
    name: null,
    email: null,
    GSTIN: null,
    company: null,
    address: null,
    userid: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.phoneNumber = action.payload.Phone_Number;
      state.name = action.payload.Name;
      state.email = action.payload.Email_id;
      state.GSTIN = action.payload.GSTIN;
      state.company = action.payload.Company_Name;
      state.address = action.payload.Address;
      state.userid = action.payload.user_id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
