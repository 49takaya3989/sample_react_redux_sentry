import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import './index.css'
import * as Sentry from "@sentry/react";

const sentryDns = import.meta.env.VITE_SENTRY_DSN;

if (sentryDns) {
  Sentry.init({
    dsn: sentryDns,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false, // ユーザーのプライバシーを保護するためにテキストをマスクするかどうか
        blockAllMedia: false, // パフォーマンスやプライバシーの理由からメディアコンテンツをブロックするかどうか
      }),
    ],

    // パフォーマンスモニタリング
    tracesSampleRate: 1.0, // アプリケーションで発生するトランザクションのうち、どれだけの割合をトレースする割合

    // 'tracePropagationTargets'で、分散トレーシングを有効にするURL
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/], // 分散トレーシングを適用するURLパターン

    // セッションリプレイ
    replaysSessionSampleRate: 0.1, // セッションリプレイを行うセッションの割合
    replaysOnErrorSampleRate: 1.0, // エラーが発生した場合のセッションリプレイのサンプルレートを指定
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
