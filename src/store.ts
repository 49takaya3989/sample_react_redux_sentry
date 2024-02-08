// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { createReduxEnhancer } from '@sentry/react';

const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action) => {
    if (action.type === "GOVERNMENT_SECRETS") {
      // Return null to not log the action to Sentry
      return null;
    }
    if (action.type === "SET_PASSWORD") {
      // Return a transformed action to remove sensitive information
      return {
        ...action,
        password: null,
      };
    }

    return action;
  },
});

export const store = configureStore({
  reducer: {
    // ここに各Reducerを追加します
    counter: counterReducer,
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  },
});

// RootState型の定義
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch型の定義
export type AppDispatch = typeof store.dispatch;
