// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';


export const store = configureStore({
  reducer: {
    // ここに各Reducerを追加します
    counter: counterReducer,
  },
});

// RootState型の定義
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch型の定義
export type AppDispatch = typeof store.dispatch;
