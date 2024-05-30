import { createSlice } from '@reduxjs/toolkit';
import { knowledgesApi } from 'src/api/knowledges';

const initialState = {
  knowledges: [],
};

const slice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
    setKnowledge(state, action) {
      state.knowledges = action.payload;
    },
  },
});
export const { setKnowledge } = slice.actions;
export const { reducer } = slice;
export const getKnowledge =
  ({ pageNumber, pageSize }) =>
  async (dispatch) => {
    const response = await knowledgesApi.getKnowledges({ pageNumber, pageSize });
    dispatch(slice.actions.setKnowledge(response));
    return response;
  };
