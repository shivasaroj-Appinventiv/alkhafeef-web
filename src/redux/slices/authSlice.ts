// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   isEmailVerified: boolean;
//   mobileNo: string;
//   countryCode: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loginMobileNo: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loginMobileNo: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     setCredentials(state, action) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//     },

//     setUserData(state, action) {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },

//     setLoginMobileNo(state, action) {
//       state.loginMobileNo = action.payload;
//     },

//     resetLoginMobileNo(state) {
//       state.loginMobileNo = null;
//     },

//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loginMobileNo = null;
//       Cookies.remove("accessToken");
//     },
//   },
// });

// export const {
//   setCredentials,
//   logout,
//   setLoginMobileNo,
//   resetLoginMobileNo,
//   setUserData,
// } = authSlice.actions;

// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loginMobileNo: string | null;
}

const initialState: AuthState = {
  loginMobileNo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMobileNo(state, action) {
      state.loginMobileNo = action.payload;
    },
    resetLoginMobileNo(state) {
      state.loginMobileNo = null;
    },
  },
});

export const { setLoginMobileNo, resetLoginMobileNo } = authSlice.actions;
export default authSlice.reducer;
