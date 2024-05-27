import { combineReducers } from '@reduxjs/toolkit';
import { reducer as knowledgeReducer } from 'src/slices/knowledge';

export const rootReducer = combineReducers({
  knowledge: knowledgeReducer,
});
