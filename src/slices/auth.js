import { createSlice } from '@reduxjs/toolkit';
import { authApi } from 'src/api/auth';

const storedUser = localStorage.getItem('accessToken');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: null,
    isAuth: !!storedUser,
    adminRoles: [],
  },
  reducers: {
    setAmin: (state, action) => {
      state.admin = action.payload;
      state.isAuth = true;
    },
    logOut: (state, action) => {
      state.admin = null;
      state.isAuth = false;
    },
    setAdminRole: (state, action) => {
      state.adminRoles = action.payload;
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
export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await authApi.whoami();
    dispatch(setAmin(response.data));
    console.log('this is whoami', response.data);
    return response;
  } catch (error) {
    dispatch(logOut());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log(error);
  }
};

export const { setAmin, logOut ,setAdminRole } = authSlice.actions;
export const { reducer } = authSlice;
export default authSlice;
