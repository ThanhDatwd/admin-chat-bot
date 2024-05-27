import { createSlice } from '@reduxjs/toolkit';
import { knowledgesApi } from 'src/api/knowledges';

const initialState = {
  knowledges: [],
};

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
    setKnowledge(state, action) {
      state.knowledges = action.payload;
    },
  },
});
export const { setKnowledge } = knowledgeSlice.actions;
export const { reducer } = knowledgeSlice;

export const getKnowledge =
  ({ pageNumber, pageSize }) =>
  async (dispatch) => {
    const response = await knowledgesApi.getKnowledges({ pageNumber, pageSize });
    console.log(response);
    dispatch(setKnowledge(response));
  };

export default knowledgeSlice;
