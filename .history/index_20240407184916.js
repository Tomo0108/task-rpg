// Express モジュールをインポート
const express = require('express');

// Express アプリケーションを作成
const app = express();

// JSONデータを扱うための設定
app.use(express.json());

// public フォルダから静的ファイルを提供する
app.use(express.static('public'));

// ルートURL ('/') にアクセスがあった場合に実行されるルートハンドラ
app.get('/');

// 3000番ポートでサーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});