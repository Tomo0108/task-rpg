#!/bin/bash

# エラーが発生した場合にスクリプトを停止する
set -e

# 必要なディレクトリを作成し、デプロイするディレクトリに移動
mkdir -p /home/ec2-user/task-rpg
cd /home/ec2-user/task-rpg

# 最新のソースコードを取得
git pull origin main

# Node.jsのプロジェクトの場合、依存関係をインストール
npm install

# アプリケーションのビルド（Node.jsのプロジェクトの場合）
npm run build

# アプリケーションを再起動するためのコマンド
# Node.jsの例では、PM2を使用してプロセスを管理する場合のコマンド
pm2 restart all

# デプロイ完了をログ出力
echo "Deployment completed successfully"