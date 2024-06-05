import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  refresh:false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setRefresh(state, action) {
      state.refresh = action.payload;
    },
  },
});
export const { setLoading,setRefresh } = commonSlice.actions;
export const { reducer } = commonSlice;

export default commonSlice;
