import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('accessToken');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser || null,
    isAuth: !!storedUser,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload?.accessToken;
      state.isAuth = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuth = false;
    },
    // refreshToken: (state, action) => {
    //   refreshToken()
    //     .then((newToken) => {
    //       state.user = newToken;
    //       state.isAuth = true;
    //     })
    //     .catch((error) => {
    //       console.error("Refresh token failed:", error);
    //       // dispatch(authSlice.actions.logOut());
    //     });
    // },
  },
});

export const { setUser, logOut } = authSlice.actions;
export const { reducer } = authSlice;
export default authSlice;
