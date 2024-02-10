import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { createReduxEnhancer } from '@sentry/react';


type StateType = ReturnType<typeof counterReducer>;

// sentryへ送信する action と state を定義
const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action: Action | AnyAction) => {
    /* ▼▼▼送信を省きたいものがあればここで定義▼▼▼ */
    // if (action.type === "GOVERNMENT_SECRETS") {
    //   // Return null to not log the action to Sentry
    //   return null;
    // }
    // if (action.type === "SET_PASSWORD") {
    //   // Return a transformed action to remove sensitive information
    //   return {
    //     ...action,
    //     password: null,
    //   };
    // }
    /* ▲▲▲送信を省きたいものがあればここで定義▲▲▲ */

    return action;
  },
  stateTransformer: (state: StateType) => {
    /* ▼▼▼送信を省きたいものがあればここで定義▼▼▼ */
    // if (state.topSecret.doNotSend) {
    //   // Return null to not send this version of the state.
    //   return null;
    // }

    // // Transform the state to remove sensitive information
    // const transformedState = {
    //   ...state,
    //   topSecret: {
    //     ...state.topSecret,
    //     // Replace sensitive information with something else
    //     nuclearLaunchCodes: "I love pizza",
    //     // or just remove it entirely
    //     hiddenTreasureLocation: null,
    //   },
    //   // You should also remove large data that is irrelevant to debugging to not clutter your Sentry issues
    //   giganticState: null,
    // };
    /* ▲▲▲送信を省きたいものがあればここで定義▲▲▲ */

    return state;
  },
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
