import { configureStore } from '@reduxjs/toolkit';
import pollReducer from './slices/pollSlice';
import formReducer from './slices/formSlice';
const store = configureStore({
  reducer: {
    polls: pollReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
