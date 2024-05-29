import { createSlice } from '@reduxjs/toolkit';
import { botsApi } from 'src/api/bots'; // Assuming you have the bots API defined

const initialState = {
  bots: [],
};

const slice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setBots(state, action) {
      state.bots = action.payload;
    },
  },
});

export const { setBots } = slice.actions;
export const { reducer } = slice;

export const getBots =
  ({ pageNumber, pageSize }) =>
  async (dispatch) => {
    try {
      const response = await botsApi.getBots({ pageNumber, pageSize });
      dispatch(slice.actions.setBots(response));
      return response;
    } catch (error) {
      console.error('Error getting bots:', error);
      throw error;
    }
  };

export const getBot = (botId) => async (dispatch) => {
  try {
    const response = await botsApi.getBot({ botId });
    return response;
  } catch (error) {
    console.error('Error getting bot:', error);
    throw error;
  }
};

export const createBot = (botData) => async (dispatch) => {
  console.log(botData);
  try {
    const response = await botsApi.createBot(botData);
    return response;
  } catch (error) {
    console.error('Error creating bot:', error);
    throw error;
  }
};
