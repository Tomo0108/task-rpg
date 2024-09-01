// モジュールをインポート
const express = require('express');
const mysql = require('mysql2');
const taskRouter = require('./routes/tasks');
const hostname = process.env.EC2_HOSTNAME || 'localhost';

// Express アプリケーションを作成
const app = express();

// JSONデータを扱うための設定
app.use(express.json());

// public フォルダから静的ファイルを提供する
app.use(express.static('public'));

// RDS接続の設定
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// タスクルートの使用
app.use('/tasks', taskRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://${hostname}:3000`);
});