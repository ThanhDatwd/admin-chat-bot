import { combineReducers } from '@reduxjs/toolkit';
import { reducer as botReducer } from 'src/slices/bot';
import { reducer as authReducer } from 'src/slices/auth';
import { reducer as commonReduce } from 'src/slices/common';
import { reducer as knowledgeReducer } from 'src/slices/knowledge';

export const rootReducer = combineReducers({
  knowledge: knowledgeReducer,
  bot: botReducer,
  auth: authReducer,
  common: commonReduce
});
