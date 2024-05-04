// Express モジュールをインポート
const express = require('express');

// Express アプリケーションを作成
const app = express();

// JSONデータを扱うための設定
app.use(express.json());

// ルートURL ('/') にアクセスがあった場合に実行されるルートハンドラ
app.get('/', (req, res) => {
  // レスポンスとして 'Hello World!' を送信
  res.send('Hello World!');
});

// 3000番ポートでサーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});