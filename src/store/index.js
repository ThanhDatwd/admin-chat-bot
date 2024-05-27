import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === 'true',
});
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
