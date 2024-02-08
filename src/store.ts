import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { createReduxEnhancer } from '@sentry/react';


type StateType = ReturnType<typeof counterReducer>;

// sentryへ送信する action と state を定義
const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action: Action | AnyAction) => action,
  stateTransformer: (state: StateType) => state,
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
