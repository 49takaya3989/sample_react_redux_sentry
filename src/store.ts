import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { createReduxEnhancer } from '@sentry/react';

const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action) => action,
  stateTransformer: (state) => state,
});

export const store = configureStore({
  reducer: {
    // ここに各Reducerを追加します
    counter: counterReducer,
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(sentryReduxEnhancer),
});

// RootState型の定義
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch型の定義
export type AppDispatch = typeof store.dispatch;
